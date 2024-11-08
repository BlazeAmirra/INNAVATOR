# end Google code

from django.http import Http404
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
