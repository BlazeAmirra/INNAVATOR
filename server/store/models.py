#!/usr/bin/python
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


from decimal import Decimal

from colorfield.fields import ColorField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=64, unique=True)
    image = models.ImageField(upload_to="photos", blank=True, null=True)
    description = models.CharField(max_length=1000)
    price = models.DecimalField(decimal_places=2, max_digits=10)
    active = models.BooleanField()
    discount_percent = models.IntegerField()
    inventory_count = models.IntegerField()
    product_we_love = models.BooleanField(default=False)

    @property
    def discount_saving(self):
        return Decimal(round(float(self.price) * (self.discount_percent / 100), 2))

    @property
    def discount_price(self):
        return "{0:.2f}".format(self.price - self.discount_saving)

    def __str__(self):
        return self.name

    ## If product is active, set all other products as inactive
    def save(self, *args, **kwargs):
        if self.active:
            qs = type(self).objects.filter(active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            qs.update(active=False)

        super(Product, self).save(*args, **kwargs)


class Testimonial(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    reviewer_name = models.CharField(max_length=64)
    reviewer_location = models.CharField(max_length=100)
    rating = models.IntegerField(
        default=5, validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    summary = models.CharField(max_length=1000)
    description = models.CharField(max_length=5000)

    def __str__(self):
        return f"{self.rating} star review on {self.product_id.name} from {self.reviewer_name}"


class Transaction(models.Model):
    datetime = models.DateTimeField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    unit_price = models.DecimalField(decimal_places=2, max_digits=10)

    def __str__(self):
        return f"{self.datetime} - {self.product_id}"


def google_font_help():
    return "Any valid <a href='https://fonts.google.com/' target='_blank'>Google Font name</a>. Dynamically loaded at runtime."


class SiteConfig(models.Model):
    active = models.BooleanField(default=True)
    color_primary = ColorField(
        default="#C200C2", help_text="For the site banner gradient"
    )
    color_secondary = ColorField(default="#BE0000", help_text="For headings")
    color_action = ColorField(default="#00AFAF", help_text="Fill for buttons")
    color_action_text = ColorField(default="#000000", help_text="Text for buttons")
    site_name = models.CharField(max_length=200, default="Simulatum")
    site_name_color = ColorField(default="#0D8645")
    site_name_font = models.CharField(
        max_length=100, default="Pacifico", help_text=google_font_help()
    )
    base_font = models.CharField(
        max_length=100, default="Tahoma", help_text=google_font_help()
    )

    def __str__(self):
        return f"{self.site_name} configuration"

    ## Only allow one active SiteConfig
    def save(self, *args, **kwargs):
        if self.active:
            qs = type(self).objects.filter(active=True)
            if self.pk:
                qs = qs.exclude(pk=self.pk)
            qs.update(active=False)

        super(SiteConfig, self).save(*args, **kwargs)

# end Google code

from django.apps import apps
from django.core.validators import RegexValidator, URLValidator
from django.contrib.auth import get_user_model
from store.snowflake_gen import innavator_slowflake_generator

contains_color_regex = '#[0-9a-fA-F]{6}'
single_color_regex = f'^{contains_color_regex}$'
color_pair_regex = f'^{contains_color_regex} {contains_color_regex}$'
color_triplet_regex = f'^{contains_color_regex} {contains_color_regex} {contains_color_regex}$'

class Subject(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
    name = models.CharField("Subject", max_length=100)

    def __str__(self):
        return f'"{self.name}" Subject'

class InnavatorUserManager(models.Manager):
    def create(self, username, email, password):
        user = get_user_model()(
            username = username,
            email = email
        )
        user.set_password(password)
        user.save()

        innavator_user = InnavatorUser(
            snowflake_id = innavator_slowflake_generator.__next__(),
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

    # "self" allows recursion
    mentees = models.ManyToManyField("self", symmetrical=False, through="Mentorship")
    willing_to_tutor = models.ManyToManyField(Subject, through="WillingnessToTutor")

    objects = InnavatorUserManager()

    def __str__(self):
        return f'User "{self.user.username}" ({self.snowflake_id})'

class Mentorship(models.Model):
    snowflake_id = models.BigIntegerField("Snowflake ID", primary_key=True, unique=True)
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
    last_read = models.BigIntegerField("Last Read Message", default=0) # not an FK so it can be zeroed or refer to a deleted message

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
