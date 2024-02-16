from django.urls import path
from .views import *

urlpatterns = [
    # Набор методов для услуг (Учебных групп)
    path('api/groups/search/', search_groups),  # GET
    path('api/groups/schedule/', get_groups_schedule),  # GET
    path('api/groups/<int:group_id>/', get_group_by_id),  # GET
    path('api/groups/<int:group_id>/lessons/', get_group_lessons),  # GET
    path('api/groups/<int:group_id>/update/', update_group),  # PUT
    path('api/groups/<int:group_id>/update_faculty/<int:faculty_id>/', update_group_faculty),  # PUT
    path('api/groups/<int:group_id>/delete/', delete_group),  # DELETE
    path('api/groups/create/', create_group),  # POST
    path('api/groups/<int:group_id>/add_to_lesson/', add_group_to_lesson),  # POST

    # Набор методов для заявок (Занятий)
    path('api/lessons/search/', search_lessons),  # GET
    path('api/lessons/<int:lesson_id>/', get_lesson_by_id),  # GET
    path('api/lessons/<int:lesson_id>/update/', update_lesson),  # PUT
    path('api/lessons/<int:lesson_id>/update_audience/', update_lesson_audience),  # PUT
    path('api/lessons/<int:lesson_id>/update_status_user/', update_lesson_user),  # PUT
    path('api/lessons/<int:lesson_id>/update_status_admin/', update_lesson_admin),  # PUT
    path('api/lessons/<int:lesson_id>/delete/', delete_lesson),  # DELETE
    path('api/lessons/<int:lesson_id>/delete_group/<int:group_id>/', delete_group_from_lesson),  # DELETE

    # Набор методов для факультетов
    path('api/faculties/search/', search_faculties),  # GET
    path('api/faculties/<int:faculty_id>/', get_faculty_by_id),  # GET
    path('api/faculties/<int:faculty_id>/icon/', get_faculty_icon),  # GET
    path('api/faculties/<int:faculty_id>/update/', update_faculty),  # POST
    path('api/faculties/<int:faculty_id>/delete/', delete_faculty),  # DELETE
    path('api/faculties/create/', create_faculty),  # POST

    # Аутентификация
    path("api/register/", register),
    path("api/login/", login),
    path("api/check/", check),
    path("api/logout/", logout),
]
