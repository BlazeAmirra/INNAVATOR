#!/usr/bin/python

from django.contrib.auth import get_user_model
from django.middleware.csrf import get_token
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from store import models as innavator_models
from store import permissions as innavator_permissions
from store import serializers as innavator_serializers
from store import snowflake_id as innavator_snowflake
from store import utils as innavator_utils

# decorator argument: tuple of HTTP methods to allow
@api_view(('GET',))
def csrf_token(request):
    return Response({"csrf_token": get_token(request)})

@api_view(('GET',))
def who_am_i(request):
    if request.user.is_authenticated:
        return Response({'logged_in': True, 'snowflake_id': innavator_utils.get_innavator_user_from_user(request.user).snowflake_id})
    return Response({'logged_in': False, 'snowflake_id': 0})

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = innavator_serializers.EmailTokenObtainPairSerializer

class InnavatorUserViewset(viewsets.ModelViewSet):
    # "__" allows accessing nested fields
    queryset = innavator_models.InnavatorUser.objects.all().exclude(user__username="admin")
    serializer_class = innavator_serializers.InnavatorUserSerializer
    permission_classes = (innavator_permissions.UsersPermissions,) # comma is necessary

    # detail: whether this requires a PK to be provided
    # methods: list of HTTP methods to allow
    @action(detail=False, methods=['get'])
    def filtered_list(self, request):
        # query_params: the stuff that comes after the question mark (ex: "example.com/page?query=help&time=now")
        query = request.query_params.get('query')
        if query:
            # icontains is case-insensitive string contains
            return innavator_utils.paginate(self, innavator_serializers.InnavatorUserSerializer, self.get_queryset().filter(preferred_name__icontains=query)
                                            .union(self.get_queryset().filter(full_name__icontains=query))
                                            .union(self.get_queryset().filter(user__username__icontains=query)))
        return innavator_utils.paginate(self, innavator_serializers.InnavatorUserSerializer, self.get_queryset())

    @action(detail=True, methods=['get'])
    def get_palette(self, request, pk):
        palette = innavator_models.Palette.objects.get(user=self.get_object())
        serializer = innavator_serializers.PaletteSerializer(palette)
        return Response(serializer.data)

    @action(detail=True, methods=['patch'])
    def patch_palette(self, request, pk):
        instance = innavator_models.Palette.objects.get(user=self.get_object())
        serializer = innavator_serializers.PaletteSerializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # copied from some place or another in the Django source
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['get'])
    def mentors(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def mentees(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_as_mentor_from_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=False,
            mentee_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_as_mentor_to_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=False,
            mentee_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_as_mentee_from_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentor=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=False
        ))

    @action(detail=True, methods=['get'])
    def requests_as_mentee_to_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.MentorshipSerializer, innavator_models.Mentorship.objects.filter(
            mentee=self.get_object(),
            mentor_accepted=True,
            mentee_accepted=False
        ))

    # creates a request to add the PK as a mentor of the sender
    @action(detail=True, methods=['post'])
    def request_as_mentor(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender == receiver:
            # don't accept self-mentorship
            return Response(status=status.HTTP_403_FORBIDDEN)

        request_message = serializer.validated_data.get('request_message', "")
        new_mentorship_snowflake = innavator_snowflake.get_snowflake_id()
        receiver.mentees.add(sender, through_defaults={'snowflake_id': new_mentorship_snowflake, 'request_message': request_message, 'mentee_accepted': True})
        return Response(status=status.HTTP_201_CREATED)

    # creates a request to add the PK as a mentee of the sender
    @action(detail=True, methods=['post'])
    def request_as_mentee(self, request, pk):
        serializer = innavator_serializers.MentorshipSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender == receiver:
            # don't accept self-mentorship
            return Response(status=status.HTTP_403_FORBIDDEN)

        request_message = serializer.validated_data.get('request_message', "")
        new_mentorship_snowflake = innavator_snowflake.get_snowflake_id()
        sender.mentees.add(receiver, through_defaults={'snowflake_id': new_mentorship_snowflake, 'request_message': request_message, 'mentor_accepted': True})
        return Response(status=status.HTTP_201_CREATED)

    # accepts the PK's request to be a mentor of the sender
    @action(detail=True, methods=['patch'])
    def accept_mentor_request(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if receiver.mentees.contains(sender):
            mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
            if mentorship.mentor_accepted and not mentorship.mentee_accepted:
                mentorship.mentee_accepted = True
                mentorship.save()

                return Response(
                    innavator_serializers.InnavatorGroupSerializer(innavator_utils.create_mentorship_group(mentor=receiver, mentee=sender)).data,
                    status=status.HTTP_202_ACCEPTED
                )
        return Response(status=status.HTTP_403_FORBIDDEN)

    # accepts the PK's request to be a mentee of the sender
    @action(detail=True, methods=['patch'])
    def accept_mentee_request(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender.mentees.contains(receiver):
            mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
            if mentorship.mentee_accepted and not mentorship.mentor_accepted:
                mentorship.mentor_accepted = True
                mentorship.save()

                return Response(
                    innavator_serializers.InnavatorGroupSerializer(innavator_utils.create_mentorship_group(mentor=sender, mentee=receiver)).data,
                    status=status.HTTP_202_ACCEPTED
                )
        return Response(status=status.HTTP_403_FORBIDDEN)

    # removes the PK as a mentor of the sender
    @action(detail=True, methods=['delete'])
    def remove_mentor(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if receiver.mentees.contains(sender):
            mentorship = innavator_models.Mentorship.objects.get(mentor=receiver, mentee=sender)
            receiver.mentees.remove(sender)
            mentorship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # removes the PK as a mentee of the sender
    @action(detail=True, methods=['delete'])
    def remove_mentee(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        receiver = self.get_object()
        if sender.mentees.contains(receiver):
            mentorship = innavator_models.Mentorship.objects.get(mentor=sender, mentee=receiver)
            sender.mentees.remove(receiver)
            mentorship.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['get'])
    def group_requests_from_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipDetailSerializer, innavator_models.GroupMembership.objects.filter(
            user=self.get_object(),
            user_accepted=True,
            group_accepted=False
        ))

    @action(detail=True, methods=['get'])
    def group_requests_to_me(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipDetailSerializer, innavator_models.GroupMembership.objects.filter(
            user=self.get_object(),
            user_accepted=False,
            group_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def portfolio(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.PortfolioEntrySerializer, innavator_models.PortfolioEntry.objects.filter(
            user=self.get_object()
        ))

    @action(detail=True, methods=['post'])
    def create_portfolio_entry(self, request, pk):
        user = self.get_object()
        serializer = innavator_serializers.PortfolioEntrySerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if not innavator_models.PortfolioEntry.objects.filter(name=name, user=user).first():
                description = serializer.validated_data.get('description', "")
                entry = innavator_models.PortfolioEntry(
                    snowflake_id=innavator_snowflake.get_snowflake_id(),
                    user=user,
                    name=name,
                    description=description
                )
                entry.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def willingnesses_to_tutor(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.WillingnessToTutorSerializer, innavator_models.WillingnessToTutor.objects.filter(
            user=self.get_object()
        ))

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        errors = {}

        if user := serializer.validated_data.get('user', None):
            if username := innavator_utils.stripped_if_not_blank(user.get('username', None)):
                if get_user_model().objects.filter(username__exact=username).first():
                    errors.update({'username': ['Username already taken.']})
                else:
                    serializer.validated_data['user']['username'] = username
            else:
                errors.update({'username': ['Username required.']})

            if email := innavator_utils.stripped_if_not_blank(user.get('email', None)):
                if get_user_model().objects.filter(email__exact=email).first():
                    errors.update({'email': ['Email address already used.']})
                else:
                    serializer.validated_data['user']['email'] = email
            else:
                errors.update({'email': ['Email address required.']})

            if not user.get('password', None):
                errors.update({'password': ['Password required.']})
        else:
            errors.update({'user': ['User object missing.']})

        missing_full_name = False
        missing_preferred_name = False
        if full_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
            serializer.validated_data['full_name'] = full_name
        else:
            missing_full_name = True
        if preferred_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
            serializer.validated_data['preferred_name'] = preferred_name
        else:
            missing_preferred_name = True
        if missing_full_name and missing_preferred_name:
            errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

        if major := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('major', None)):
            serializer.validated_data['major'] = major
        else:
            errors.update({'major': ['Major required.']})

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            # the method called by the default create handler which wraps the serializer save method
            self.perform_create(serializer)
            return Response(status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        errors = {}

        missing_full_name = False
        missing_preferred_name = False
        if full_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('full_name', None)):
            serializer.validated_data['full_name'] = full_name
        else:
            missing_full_name = True
        if preferred_name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('preferred_name', None)):
            serializer.validated_data['preferred_name'] = preferred_name
        else:
            missing_preferred_name = True
        if missing_full_name and missing_preferred_name and not partial:
            errors.update({'full_name': ['Full Name and/or Preferred Name required.'], 'preferred_name': ['Full Name and/or Preferred Name required.']})

        if major := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('major', None)):
            serializer.validated_data['major'] = major
        elif not partial:
            errors.update({'major': ['Major required.']})

        if errors:
            return Response(errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.perform_update(serializer)

            if getattr(instance, '_prefetched_objects_cache', None):
                # If 'prefetch_related' has been applied to a queryset, we need to
                # forcibly invalidate the prefetch cache on the instance.
                instance._prefetched_objects_cache = {}

            return Response(status=status.HTTP_202_ACCEPTED)

class InnavatorGroupViewset(mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.InnavatorGroup.objects.all()
    serializer_class = innavator_serializers.InnavatorGroupSerializer
    permission_classes = (innavator_permissions.GroupsPermissions,) # comma is necessary

    @action(detail=False, methods=['get'])
    def all(self, request):
        return innavator_utils.paginate(self, innavator_serializers.InnavatorGroupPreviewSerializer, self.queryset)

    @action(detail=False, methods=['get'])
    def clubs(self, request):
        return innavator_utils.paginate(self, innavator_serializers.InnavatorGroupPreviewSerializer, innavator_models.InnavatorGroup.objects.filter(
            is_club=True
        ))

    @action(detail=False, methods=['get'])
    def list_group_memberships(self, request):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipDetailSerializer, innavator_models.GroupMembership.objects.filter(
            user=innavator_utils.get_innavator_user_from_user(request.user),
            user_accepted=True,
            group_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def my_membership(self, request, pk):
        return Response(
            innavator_serializers.GroupMembershipDetailSerializer(
                innavator_models.GroupMembership.objects.get(group=self.get_object(), user=innavator_utils.get_innavator_user_from_user(request.user))
            ).data
        )

    @action(detail=True, methods=['get'])
    def members(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipSerializer, innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=True,
            group_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_from_group(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipDetailSerializer, innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=False,
            group_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_to_group(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.GroupMembershipDetailSerializer, innavator_models.GroupMembership.objects.filter(
            group=self.get_object(),
            user_accepted=True,
            group_accepted=False
        ))

    @action(detail=True, methods=['get'])
    def channels(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ChannelSerializer, innavator_models.Channel.objects.filter(
            group=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def projects(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectSerializer, innavator_models.Project.objects.filter(
            group=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def events(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.EventSerializer, innavator_models.Event.objects.filter(
            group=self.get_object()
        ))

    @action(detail=True, methods=['post'])
    def create_channel(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.ChannelSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if not innavator_models.Channel.objects.filter(name=name, group=group).first():
                channel = innavator_models.Channel(
                    snowflake_id=innavator_snowflake.get_snowflake_id(),
                    group=group,
                    name=name
                )
                channel.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_project(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.ProjectSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if not innavator_models.Project.objects.filter(name=name, group=group).first():
                description = serializer.validated_data.get('description', "")
                project = innavator_models.Project(
                    snowflake_id=innavator_snowflake.get_snowflake_id(),
                    group=group,
                    name=name,
                    description=description
                )
                project.save()
                project.members.add(innavator_utils.get_innavator_user_from_user(request.user), through_defaults={
                    'snowflake_id': innavator_snowflake.get_snowflake_id(),
                    'role': innavator_models.Role.objects.get(name="Team Lead"),
                    'is_active': True,
                    'user_accepted': True,
                    'project_accepted': True,
                    'request_message': ""
                })
                return Response(self.get_serializer(project).data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def create_event(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.EventSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            if start_time := serializer.validated_data.get('start_time', None):
                description = serializer.validated_data.get('description', "")
                event = innavator_models.Event(
                    snowflake_id=innavator_snowflake.get_snowflake_id(),
                    group=group,
                    name=name,
                    description=description,
                    start_time=start_time
                )
                event.save()
                return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def invite(self, request, pk):
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('user', None):
            if not innavator_models.GroupMembership.objects.filter(user=receiver, group=group).first():
                request_message = serializer.validated_data.get('request_message', "")
                is_privileged = serializer.validated_data.get('is_privileged', False)
                new_membership_snowflake = innavator_snowflake.get_snowflake_id()
                group.members.add(receiver, through_defaults={
                    'snowflake_id': new_membership_snowflake,
                    'request_message': request_message,
                    'is_privileged': is_privileged,
                    'group_accepted': True
                })
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def request_to_join(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if not innavator_models.GroupMembership.objects.filter(user=sender, group=group).first():
            request_message = serializer.validated_data.get('request_message', "")
            new_membership_snowflake = innavator_snowflake.get_snowflake_id()
            group.members.add(sender, through_defaults={
                'snowflake_id': new_membership_snowflake,
                'request_message': request_message,
                'user_accepted': True
            })
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['patch'])
    def accept_invite(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()

        if group.members.contains(user):
            membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
            if membership.group_accepted and not membership.user_accepted:
                membership.user_accepted = True
                membership.save()
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['patch'])
    def accept_join_request(self, request, pk):
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('user', None):
            group = self.get_object()
            if group.members.contains(receiver):
                membership = innavator_models.GroupMembership.objects.get(user=receiver, group=group)
                if membership.user_accepted and not membership.group_accepted:
                    membership.group_accepted = True
                    membership.save()
                    return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects a request to join
    @action(detail=True, methods=['post'])
    def remove_user(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()
        serializer = innavator_serializers.GroupMembershipDetailSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if user := serializer.validated_data.get('user', None):
            # you may not throw out the owner
            if group.owner != user:
                if group.members.contains(user):
                    membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
                    # privileged non-owner users may not cat-fight
                    if group.owner == sender or not membership.is_privileged:
                        group.members.remove(user)
                        membership.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects an invite
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        group = self.get_object()

        # don't let the owner leave without passing the buck
        if group.owner != user:
            if group.members.contains(user):
                membership = innavator_models.GroupMembership.objects.get(user=user, group=group)
                group.members.remove(user)
                membership.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        serializer = self.get_serializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if name := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('name', None)):
            serializer.validated_data['name'] = name
            group = serializer.save(snowflake_id=innavator_snowflake.get_snowflake_id(), owner=innavator_utils.get_innavator_user_from_user(request.user))
            innavator_user = innavator_utils.get_innavator_user_from_user(request.user)
            group.members.add(innavator_user, through_defaults={
                'snowflake_id': innavator_snowflake.get_snowflake_id(),
                'is_privileged': True,
                'user_accepted': True,
                'group_accepted': True
            })
            return Response(self.get_serializer(group).data, status=status.HTTP_201_CREATED)
        return Response({'name': ['Name required.']}, status=status.HTTP_400_BAD_REQUEST)

class ChannelViewset(mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Channel.objects.all()
    serializer_class = innavator_serializers.ChannelSerializer
    permission_classes = (innavator_permissions.ChannelsPermissions,) # comma is necessary

    # this uses POST because it mutates the last read state
    @action(detail=True, methods=['post'])
    def messages(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        innavator_utils.update_last_read_message(channel, sender)

        # minus sign in ordering means largest first (which since snowflakes are most significantly time-derived also means most recent)
        return innavator_utils.paginate(self, innavator_serializers.MessageSerializer, innavator_models.Message.objects.filter(channel=channel).order_by('-snowflake_id'))

    @action(detail=True, methods=['get'])
    def unread_message_count(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        count = 0
        if channel.last_read_list.contains(sender):
            count = innavator_models.Message.objects.filter(channel=channel, snowflake_id__gt=innavator_models.LastRead.objects.get(channel=channel, user=sender).last_read).count()
        else:
            count = innavator_models.Message.objects.filter(channel=channel).count()
        return Response({'count': count})

    @action(detail=True, methods=['post'])
    def create_message(self, request, pk):
        channel = self.get_object()
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        serializer = innavator_serializers.MessageSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if contents := innavator_utils.stripped_if_not_blank(serializer.validated_data.get('contents', None)):
            message = innavator_models.Message(
                snowflake_id=innavator_snowflake.get_snowflake_id(),
                channel=channel,
                sender=sender,
                contents=contents
            )
            message.save()
            innavator_utils.update_last_read_message(channel, sender)
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class MessageViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Message.objects.all()
    serializer_class = innavator_serializers.MessageSerializer
    permission_classes = (innavator_permissions.MessagesPermissions,) # comma is necessary

class RoleViewset(viewsets.ReadOnlyModelViewSet):
    queryset = innavator_models.Role.objects.all()
    serializer_class = innavator_serializers.RoleSerializer
    permission_classes = (innavator_permissions.RolesPermissions,) # comma is necessary

    @action(detail=True, methods=['get'])
    def get_commission_requests(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.CommissionRequestSerializer, innavator_models.CommissionRequest.objects.filter(
            role=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def get_projects(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectSerializer, innavator_models.Project.objects.filter(
            looking_for_roles=self.get_object()
        ))

class ProjectViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Project.objects.all()
    serializer_class = innavator_serializers.ProjectSerializer
    permission_classes = (innavator_permissions.ProjectsPermissions,) # comma is necessary

    @action(detail=True, methods=['get'])
    def members(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectRoleSerializer, innavator_models.ProjectRole.objects.filter(
            project=self.get_object(),
            user_accepted=True,
            project_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def active_members(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectRoleSerializer, innavator_models.ProjectRole.objects.filter(
            project=self.get_object(),
            is_active=True
        ))

    @action(detail=True, methods=['post'])
    def invite(self, request, pk):
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('user', None):
            if role := serializer.validated_data.get('role', None):
                if not innavator_models.ProjectRole.objects.filter(user=receiver, project=project).first():
                    request_message = serializer.validated_data.get('request_message', "")
                    new_project_role_snowflake = innavator_snowflake.get_snowflake_id()
                    project.members.add(receiver, through_defaults={
                        'snowflake_id': new_project_role_snowflake,
                        'role': role,
                        'request_message': request_message,
                        'project_accepted': True
                    })
                    return Response(status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_403_FORBIDDEN)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def request_to_join(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if role := serializer.validated_data.get('role', None):
            if not innavator_models.ProjectRole.objects.filter(user=sender, project=project).first():
                request_message = serializer.validated_data.get('request_message', "")
                new_project_role_snowflake = innavator_snowflake.get_snowflake_id()
                project.members.add(sender, through_defaults={
                    'snowflake_id': new_project_role_snowflake,
                    'role': role,
                    'request_message': request_message,
                    'user_accepted': True
                })
                return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['get'])
    def requests_from_project(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectRoleSerializer, innavator_models.ProjectRole.objects.filter(
            project=self.get_object(),
            user_accepted=False,
            project_accepted=True
        ))

    @action(detail=True, methods=['get'])
    def requests_to_project(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectRoleSerializer, innavator_models.ProjectRole.objects.filter(
            project=self.get_object(),
            user_accepted=True,
            project_accepted=False
        ))

    @action(detail=True, methods=['patch'])
    def accept_invite(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        project = self.get_object()

        if project.members.contains(user):
            membership = innavator_models.ProjectRole.objects.get(user=user, project=project)
            if membership.project_accepted and not membership.user_accepted:
                membership.user_accepted = True
                membership.is_active = True
                membership.save()

                if not project.group.members.contains(user):
                    project.group.members.add(user, through_defaults={
                        'snowflake_id': innavator_snowflake.get_snowflake_id(),
                        'user_accepted': True,
                        'group_accepted': True
                    })

                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['patch'])
    def accept_join_request(self, request, pk):
        serializer = innavator_serializers.ProjectRoleSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if receiver := serializer.validated_data.get('user', None):
            project = self.get_object()
            if project.members.contains(receiver):
                membership = innavator_models.ProjectRole.objects.get(user=receiver, project=project)
                if membership.user_accepted and not membership.project_accepted:
                    membership.project_accepted = True
                    membership.is_active = True
                    membership.save()

                    if not project.group.members.contains(receiver):
                        project.group.members.add(receiver, through_defaults={
                            'snowflake_id': innavator_snowflake.get_snowflake_id(),
                            'user_accepted': True,
                            'group_accepted': True
                        })

                    return Response(innavator_serializers.InnavatorGroupSerializer(project.group).data, status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects a request to join
    @action(detail=True, methods=['post'])
    def remove_user(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if user := serializer.validated_data.get('user', None):
            # you may not throw out the group owner
            if project.group.owner != user:
                if project.members.contains(user):
                    group_membership = innavator_models.GroupMembership.objects.get(user=user, group=project.group)
                    project_membership = innavator_models.ProjectRole.objects.get(user=user, project=project)
                    # privileged non-owner users may not cat-fight
                    if project.group.owner == sender or not group_membership.is_privileged:
                        if project_membership.is_active:
                            project_membership.is_active = False
                            project_membership.save()
                        else:
                            project.members.remove(user)
                            project_membership.delete()
                        return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    # this also rejects an invite
    @action(detail=True, methods=['delete'])
    def leave(self, request, pk):
        user = innavator_utils.get_innavator_user_from_user(request.user)
        project = self.get_object()

        if project.members.contains(user):
            membership = innavator_models.ProjectRole.objects.get(user=user, project=project)
            if membership.is_active:
                membership.is_active = False
                membership.save()
            else:
                project.members.remove(user)
                membership.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def alter_role(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if user := serializer.validated_data.get('user', None):
            if role := serializer.validated_data.get('role', None):
                # you may not mess with the group owner
                if project.group.owner == sender or project.group.owner != user:
                    if project.members.contains(user):
                        group_membership = innavator_models.GroupMembership.objects.get(user=user, group=project.group)
                        project_membership = innavator_models.ProjectRole.objects.get(user=user, project=project)
                        # privileged non-owner users may not cat-fight
                        if project.group.owner == sender or not group_membership.is_privileged:
                            if project_membership.is_active:
                                project_membership.role = role
                                project_membership.save()
                                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def add_needed_role(self, request, pk):
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleNeedSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if role := serializer.validated_data.get('role', None):
            if not project.looking_for_roles.contains(role):
                project.looking_for_roles.add(role, through_defaults={'snowflake_id': innavator_snowflake.get_snowflake_id()})
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def remove_needed_role(self, request, pk):
        project = self.get_object()
        serializer = innavator_serializers.ProjectRoleNeedSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if role := serializer.validated_data.get('role', None):
            if project.looking_for_roles.contains(role):
                project.looking_for_roles.remove(role)
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def add_subject(self, request, pk):
        project = self.get_object()
        serializer = innavator_serializers.ProjectSubjectSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if subject := serializer.validated_data.get('subject', None):
            if not project.subjects.contains(subject):
                project.subjects.add(subject, through_defaults={'snowflake_id': innavator_snowflake.get_snowflake_id()})
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['post'])
    def remove_subject(self, request, pk):
        project = self.get_object()
        serializer = innavator_serializers.ProjectSubjectSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        if subject := serializer.validated_data.get('subject', None):
            if project.subjects.contains(subject):
                project.subjects.remove(subject)
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

class CommissionRequestViewset(viewsets.ModelViewSet):
    queryset = innavator_models.CommissionRequest.objects.all()
    serializer_class = innavator_serializers.CommissionRequestSerializer
    permission_classes = (innavator_permissions.CommissionRequestsPermissions,) # comma is necessary

    # the method called by the default create handler which wraps the serializer save method
    def perform_create(self, serializer):
        serializer.validated_data["name"] = innavator_utils.stripped_if_not_blank(serializer.validated_data["name"])
        serializer.save(snowflake_id=innavator_snowflake.get_snowflake_id(), sender=innavator_utils.get_innavator_user_from_user(self.request.user))

class EventViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.Event.objects.all()
    serializer_class = innavator_serializers.EventSerializer
    permission_classes = (innavator_permissions.EventsPermissions,) # comma is necessary

class PortfolioEntryViewset(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = innavator_models.PortfolioEntry.objects.all()
    serializer_class = innavator_serializers.PortfolioEntrySerializer
    permission_classes = (innavator_permissions.PortfolioEntriesPermissions,) # comma is necessary

class SubjectViewset(viewsets.ReadOnlyModelViewSet):
    queryset = innavator_models.Subject.objects.all()
    serializer_class = innavator_serializers.SubjectSerializer
    permission_classes = (innavator_permissions.SubjectsPermissions,) # comma is necessary

    @action(detail=True, methods=['get'])
    def portfolio_entries(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.PortfolioEntrySerializer, innavator_models.PortfolioEntry.objects.filter(
            subject=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def tutors(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.WillingnessToTutorSerializer, innavator_models.WillingnessToTutor.objects.filter(
            subject=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def projects(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectSerializer, innavator_models.Project.objects.filter(
            subjects=self.get_object()
        ))

    @action(detail=True, methods=['get'])
    def interactive_projects(self, request, pk):
        return innavator_utils.paginate(self, innavator_serializers.ProjectSerializer, innavator_models.Project.objects.filter(
            subjects=self.get_object(),
            is_interactive=True
        ))

    @action(detail=True, methods=['post'])
    def add_tutor_willingness(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        subject = self.get_object()

        if not sender.willing_to_tutor.contains(subject):
            sender.willing_to_tutor.add(subject, through_defaults={
                'snowflake_id': innavator_snowflake.get_snowflake_id()
            })
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)

    @action(detail=True, methods=['delete'])
    def remove_tutor_willingness(self, request, pk):
        sender = innavator_utils.get_innavator_user_from_user(request.user)
        subject = self.get_object()

        if sender.willing_to_tutor.contains(subject):
            sender.willing_to_tutor.remove(subject)
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_403_FORBIDDEN)
