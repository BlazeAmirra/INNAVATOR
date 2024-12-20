#!/usr/bin/python

from django.http import Http404
from rest_framework.response import Response

from store import models as innavator_models
from store import snowflake_id as innavator_snowflake

def stripped_if_not_blank(object):
    """
    If the input is a falsey object or empty string or a string with just whitespace, returns None.
    Otherwise, its `strip` method is called under presumption that it is a string.
    """
    if object:
        if (stripped_object := object.strip()) != '':
            return stripped_object
    return None

def get_innavator_user_from_user(user):
    """
    Returns an InnavatorUser object given the input User PK.\n
    Raises an Http404 exception if the object is not found,
    though that shouldn't happen since User PKs shouldn't be included in requests.
    """
    try:
        return innavator_models.InnavatorUser.objects.get(user=user)
    except innavator_models.InnavatorUser.DoesNotExist:
        raise Http404

def update_last_read_message(channel, user):
    """
    Sets the given user's last read message in the given channel to its most recent.
    """
    last_read_object = None
    if not channel.last_read_list.contains(user):
        new_last_read_snowflake = innavator_snowflake.get_snowflake_id()
        channel.last_read_list.add(user, through_defaults={
            'snowflake_id': new_last_read_snowflake
        })
        last_read_object = innavator_models.LastRead.objects.get(pk=new_last_read_snowflake)
    else:
        last_read_object = innavator_models.LastRead.objects.get(channel=channel, user=user)
    last_read_object.update_last()

def create_mentorship_group(mentor, mentee):
    """
    Creates a group for when a mentorship is formed, where the mentor is the owner and the mentee privileged.
    """
    group_name = ""
    if mentor.preferred_name:
        if mentee.preferred_name:
            group_name = f"{mentor.preferred_name}'s mentorship of {mentee.preferred_name}"
        else:
            group_name = f"{mentor.preferred_name}'s mentorship of {mentee.full_name}"
    else:
        if mentee.preferred_name:
            group_name = f"{mentor.full_name}'s mentorship of {mentee.preferred_name}"
        else:
            group_name = f"{mentor.full_name}'s mentorship of {mentee.full_name}"
    group = innavator_models.InnavatorGroup(
        snowflake_id = innavator_snowflake.get_snowflake_id(),
        name = group_name,
        owner = mentor
    )
    group.save()
    group.members.add(mentor, through_defaults={
        'snowflake_id': innavator_snowflake.get_snowflake_id(),
        'is_privileged': True,
        'user_accepted': True,
        'group_accepted': True
    })
    group.members.add(mentee, through_defaults={
        'snowflake_id': innavator_snowflake.get_snowflake_id(),
        'is_privileged': True,
        'user_accepted': True,
        'group_accepted': True
    })

    return group

def paginate(viewset, serializer, queryset):
    """
    Given the inputs and the state within a viewset list query, returns a paginated response.
    """
    page = viewset.paginate_queryset(queryset)
    if page:
        return viewset.get_paginated_response(serializer(page, many=True).data)
    return Response(serializer(queryset, many=True).data)
