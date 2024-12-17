#!/usr/bin/python

from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter

from store import views

router = DefaultRouter()

router.get_api_root_view().cls.__name__ = "Innavator Server"
router.get_api_root_view().cls.__doc__ = (
    "This is the Django REST Framework API, serving all endpoints."
)

router.register(r"users", views.InnavatorUserViewset, basename="user")
router.register(r"groups", views.InnavatorGroupViewset, basename="group")
router.register(r"channels", views.ChannelViewset, basename="channel")
router.register(r"messages", views.MessageViewset, basename="message")
router.register(r"roles", views.RoleViewset, basename="role")
router.register(r"projects", views.ProjectViewset, basename="project")
router.register(r"commissions", views.CommissionRequestViewset, basename="commission")
router.register(r"events", views.EventViewset, basename="event")
router.register(r"portfolio_entries", views.PortfolioEntryViewset, basename="portfolio")
router.register(r"subjects", views.SubjectViewset, basename="subject")

urlpatterns = [
    path("", include(router.urls)),
    path("csrf_token/", views.csrf_token, name="csrf_token"),
    path("who_am_i/", views.who_am_i, name='who_am_i'),

    path("jwt_token/", views.EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("jwt_token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),
    # path("jwt_token/verify/", TokenVerifyView.as_view(), name='token_verify'),
]
