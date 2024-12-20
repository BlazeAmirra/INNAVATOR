#!/usr/bin/python

from django.apps import apps
from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator, URLValidator
from django.db import models

from store import snowflake_id as innavator_snowflake

contains_color_regex = '#[0-9a-fA-F]{6}'
single_color_regex = f'^{contains_color_regex}$'
color_pair_regex = f'^{contains_color_regex} {contains_color_regex}$'
color_triplet_regex = f'^{contains_color_regex} {contains_color_regex} {contains_color_regex}$'

class Subject(models.Model):
    # using a snowflake as PK allows for ensuring uniqueness and also automatically encodes a creation datetime
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    name = models.CharField("Subject", max_length=100)

    # every model needs to have a string representation
    def __str__(self):
        return f'"{self.name}" Subject'

# a model manager, which can be used to provide alternative interfaces to model interactions
class InnavatorUserManager(models.Manager):
    def create(self, username, email, password):
        user = get_user_model()(
            username = username,
            email = email
        )
        user.set_password(password)
        user.save()

        innavator_user = InnavatorUser(
            snowflake_id = innavator_snowflake.get_snowflake_id(),
            user = user
        )
        innavator_user.save()

        Palette(user=innavator_user).save()

        return innavator_user

class InnavatorUser(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    full_name = models.CharField("Full Name", max_length=300, blank=True)
    preferred_name = models.CharField("Preferred Name", max_length=150, blank=True)

    major = models.CharField("Major", max_length=100, default="Computer Science")
    website_url = models.URLField("Website URL", max_length=300, blank=True, validators=[URLValidator()])
    profile_picture_url = models.URLField("Profile Picture URL", max_length=300, blank=True, validators=[URLValidator()])

    # "self" allows recursion, "symmetrical" specifies whether A->B also creates B->A,
    # "through" specifies a future model name which is used to carry the intersectional data.
    # (such a model should always be made manually instead of using the automatic one so it can be added to later)
    mentees = models.ManyToManyField("self", symmetrical=False, through="Mentorship")
    willing_to_tutor = models.ManyToManyField(Subject, through="WillingnessToTutor")

    objects = InnavatorUserManager()

    def __str__(self):
        return f'User "{self.user.username}" ({self.snowflake_id})'

class Mentorship(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    # when the two models of the many-to-many relation are the same, then the first FK is the object containing the relation.
    # when any model contains multiple FKs of the same type, each needs to be manually given a unique related_name
    mentor = models.ForeignKey(InnavatorUser, related_name='%(app_label)s_%(class)s_mentor', on_delete=models.CASCADE)
    mentee = models.ForeignKey(InnavatorUser, related_name='%(app_label)s_%(class)s_mentee', on_delete=models.CASCADE)
    mentor_accepted = models.BooleanField("Mentor Accepted", default=False)
    mentee_accepted = models.BooleanField("Mentee Accepted", default=False)
    request_message = models.CharField("Request Message", max_length=2000, blank=True)

    def __str__(self):
        return f"{self.mentor}'s mentorship of {self.mentee}"

class Palette(models.Model):
    user = models.OneToOneField(InnavatorUser, on_delete=models.CASCADE, primary_key=True, unique=True)
    main_background_gradient_triplet = models.CharField("Main Background Gradient", max_length=23, default='#FF9156 #92259A #BA2045', validators=[RegexValidator(regex=color_triplet_regex)])
    ui_group_background_gradient_triplet = models.CharField("UI Group Background Gradient", max_length=23, default='#FDF6C4 #D98CE3 #D26E8C', validators=[RegexValidator(regex=color_triplet_regex)])

    def __str__(self):
        return f"{self.user}'s palette"

class WillingnessToTutor(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    user = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        # Specifies the plural used in places like the admin panel, which defaults to just "<name>s"
        verbose_name_plural = "Willingnesses to mentor"

    def __str__(self):
        return f"{self.user}'s willingness to mentor {self.subject}"

class InnavatorGroup(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    members = models.ManyToManyField(InnavatorUser, related_name='%(app_label)s_%(class)s_members', through="GroupMembership")
    owner = models.ForeignKey(InnavatorUser, related_name='%(app_label)s_%(class)s_owner', on_delete=models.CASCADE) # TODO: set on_delete to something more sane
    name = models.CharField("Name", max_length=100)
    is_club = models.BooleanField("Is Club", default=False)

    def __str__(self):
        return f'Group "{self.name}" ({self.snowflake_id})'

class GroupMembership(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    user = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    group = models.ForeignKey(InnavatorGroup, on_delete=models.CASCADE)
    is_privileged = models.BooleanField("Is Privileged", default=False)
    user_accepted = models.BooleanField("User Accepted", default=False)
    group_accepted = models.BooleanField("Group Accepted", default=False)
    request_message = models.CharField("Request Message", max_length=2000, blank=True)

    def __str__(self):
        return f"{self.user}'s membership in {self.group}"

class Channel(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    group = models.ForeignKey(InnavatorGroup, on_delete=models.CASCADE)
    name = models.CharField("Name", max_length=100)
    read_restricted = models.BooleanField("Read Restricted", default=False)
    write_restricted = models.BooleanField("Write Restricted", default=False)
    last_read_list = models.ManyToManyField(InnavatorUser, through="LastRead")

    # reminder that these are at the end of the day "normal" Python objects, so they can contain instance methods and the like
    def get_latest_message(self):
        return apps.get_model('store', 'Message').objects.filter(channel=self).order_by('-snowflake_id').first()

    def __str__(self):
        return f'Channel "{self.name}" in {self.group}'

class Message(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    sender = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE) # TODO: set on_delete to something more sane
    contents = models.CharField("Contents", max_length=2000)
    is_edited = models.BooleanField("Is Edited", default=False)
    last_revision = models.DateTimeField("Last Revision", auto_now_add=True)

    def __str__(self):
        return f'Message {self.snowflake_id} from {self.sender} in {self.channel}'

class LastRead(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    channel = models.ForeignKey(Channel, on_delete=models.CASCADE)
    user = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    last_read = models.BigIntegerField("Last Read Message", default=0) # not defined as an FK so it can be zeroed or refer to a deleted message

    def update_last(self):
        if latest_message := self.channel.get_latest_message():
            self.last_read = latest_message.snowflake_id
        else:
            self.last_read = 0
        self.save()

    def __str__(self):
        if self.last_read != 0:
            return f'{self.user} last read message "{self.last_read}" in {self.channel}'
        else:
            return f'{self.user} has not read any message in {self.channel}'

class Role(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    name = models.CharField("Role", max_length=100)

    def __str__(self):
        return f'"{self.name}" Role'

class Project(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    group = models.ForeignKey(InnavatorGroup, on_delete=models.CASCADE)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description", max_length=300, blank=True)
    is_active = models.BooleanField("Is Active", default=True)
    looking_for_roles = models.ManyToManyField(Role, through="ProjectRoleNeed")
    members = models.ManyToManyField(InnavatorUser, through="ProjectRole")
    subjects = models.ManyToManyField(Subject, through="ProjectSubject")
    is_interactive = models.BooleanField("Is Interactive", default=False)

    def __str__(self):
        return f'Project "{self.name}" ({self.snowflake_id}) by {self.group}'

class ProjectRoleNeed(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.project}\'s need for {self.role}'

class ProjectRole(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    is_active = models.BooleanField("Is Active", default=False)
    user_accepted = models.BooleanField("User Accepted", default=False)
    project_accepted = models.BooleanField("Group Accepted", default=False)
    request_message = models.CharField("Request Message", max_length=2000, blank=True)

    def __str__(self):
        return f'{self.user}\'s {self.role} in {self.project}'

class ProjectSubject(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.project}\'s tagging as involving {self.subject}'

class CommissionRequest(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    sender = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description", max_length=300, blank=True)

    def __str__(self):
        return f'{self.sender}\'s request ({self.snowflake_id}) for a {self.role}'

class Event(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    group = models.ForeignKey(InnavatorGroup, on_delete=models.CASCADE)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description", max_length=300, blank=True)
    start_time = models.DateTimeField("Start Timestamp")

    def __str__(self):
        return f'Event "{self.name}" ({self.snowflake_id}) in {self.group}'

class PortfolioEntry(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    user = models.ForeignKey(InnavatorUser, on_delete=models.CASCADE)
    name = models.CharField("Name", max_length=100)
    description = models.CharField("Description", max_length=300, blank=True)
    url = models.URLField("URL", max_length=300, blank=True, validators=[URLValidator()])
    picture_url = models.URLField("Picture URL", max_length=300, blank=True, validators=[URLValidator()])
    subject = models.ForeignKey("Subject", null=True, on_delete=models.CASCADE) # TODO: set on_delete to something more sane

    class Meta:
        verbose_name_plural = "Portfolio entries"

    def __str__(self):
        return f'"{self.name}" in {self.user}\'s portfolio'
