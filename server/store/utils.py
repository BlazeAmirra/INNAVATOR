# end Google code

from django.http import Http404
from store.models import InnavatorUser

def stripped_if_not_blank(object):
    if object:
        if (stripped_object := object.strip()) != '':
            return stripped_object
    return None

def get_innavator_user(pk):
    try:
        return InnavatorUser.objects.get(pk=pk)
    except InnavatorUser.DoesNotExist:
        raise Http404

def get_innavator_user_from_user(user):
    try:
        return InnavatorUser.objects.get(user=user)
    except InnavatorUser.DoesNotExist:
        raise Http404
