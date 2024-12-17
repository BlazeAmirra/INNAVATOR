#!/usr/bin/python

from django.http import Http404
from rest_framework.response import Response
from store import models as innavator_models
from store.snowflake_gen import innavator_slowflake_generator

def stripped_if_not_blank(object):
    if object:
        if (stripped_object := object.strip()) != '':
            return stripped_object
    return None

def get_innavator_user(pk):
    try:
        return innavator_models.InnavatorUser.objects.get(pk=pk)
    except innavator_models.InnavatorUser.DoesNotExist:
        raise Http404

def get_innavator_user_from_user(user):
    try:
        return innavator_models.InnavatorUser.objects.get(user=user)
    except innavator_models.InnavatorUser.DoesNotExist:
        raise Http404

def update_last_read_message(channel, user):
    last_read_object = None
    if not channel.last_read_list.contains(user):
        new_last_read_snowflake = innavator_slowflake_generator.__next__()
        channel.last_read_list.add(user, through_defaults={
            'snowflake_id': new_last_read_snowflake
        })
        last_read_object = innavator_models.LastRead.objects.get(pk=new_last_read_snowflake)
    else:
        last_read_object = innavator_models.LastRead.objects.get(channel=channel, user=user)
    last_read_object.update_last()

def create_mentorship_group(mentor, mentee):
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
        snowflake_id = innavator_slowflake_generator.__next__(),
        name = group_name,
        owner = mentor
    )
    group.save()
    group.members.add(mentor, through_defaults={
        'snowflake_id': innavator_slowflake_generator.__next__(),
        'is_privileged': True,
        'user_accepted': True,
        'group_accepted': True
    })
    group.members.add(mentee, through_defaults={
        'snowflake_id': innavator_slowflake_generator.__next__(),
        'is_privileged': True,
        'user_accepted': True,
        'group_accepted': True
    })

    return group

def paginate(viewset, serializer, queryset):
    page = viewset.paginate_queryset(queryset)
    if page:
        return viewset.get_paginated_response(serializer(page, many=True).data)
    return Response(serializer(queryset, many=True).data)
