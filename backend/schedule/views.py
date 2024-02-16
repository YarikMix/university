import ast
from datetime import datetime

import requests
from django.contrib.auth import authenticate
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .jwt_helper import create_access_token
from .permissions import *
from .serializer import *
from .utils.utils import get_last_group_id

access_token_lifetime = settings.JWT["ACCESS_TOKEN_LIFETIME"].total_seconds()


def get_draft_lesson(request):
    token = get_access_token(request)
    payload = get_jwt_payload(token)
    user_id = payload["user_id"]

    return Lesson.objects.filter(user_id=user_id).filter(status=1).first()


@api_view(["GET"])
def get_group_lessons(request, group_id):
    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    group = Group.objects.get(pk=group_id)
    lessons = group.lesson_set

    serializer = LessonSerializer(lessons, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def search_groups(request):
    course_id = request.GET.get("course", -1)
    education_type_id = request.GET.get("education_type", -1)
    query = request.GET.get("query", "")
    faculties = request.GET.get("faculties", "[-1]")
    offset = int(request.GET.get("offset", 0))
    limit = int(request.GET.get("limit", 5))

    groups = Group.objects.filter(name__icontains=query).filter(status=1)

    draft_lesson = get_draft_lesson(request)

    if int(course_id) > 0:
        groups = groups.filter(course=course_id)

    if int(education_type_id) > 0:
        groups = groups.filter(education_type=education_type_id)

    if -1 not in ast.literal_eval(faculties):
        groups = groups.filter(faculty__in=ast.literal_eval(faculties))

    serializer = GroupSerializer(groups[offset:offset + limit], many=True)
    resp = {
        "draft_lesson_id": draft_lesson.pk if draft_lesson else None,
        "groups": serializer.data,
        "totalCount": len(groups)
    }

    return Response(resp)


def get_busy_days(groups):
    schedule = []

    for group_id in groups:
        lessons = Lesson.objects.filter(groups__exact=group_id)
        group_schedule = set([(lesson.day_of_week, lesson.time) for lesson in lessons])
        schedule.extend(group_schedule)

    return schedule


@api_view(["POST"])
def get_groups_schedule(request):
    groups = request.data.get("groups", [])
    busy_days = get_busy_days(groups)
    print(busy_days)
    return Response(busy_days, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_group_by_id(request, group_id):
    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    group = Group.objects.get(pk=group_id)
    serializer = GroupSerializer(group, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsModerator])
def update_group(request, group_id):
    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    group = Group.objects.get(pk=group_id)
    serializer = GroupSerializer(group, data=request.data, many=False, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsModerator])
def update_group_faculty(request, group_id, faculty_id):
    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    group = Group.objects.get(pk=group_id)
    group.faculty = Faculty.objects.get(pk=faculty_id)
    group.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsModerator])
def create_group(request):
    last_group_id = get_last_group_id()
    group = Group(pk=last_group_id)
    group.save()

    serializer = GroupSerializer(group, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_group(request, group_id):
    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    group = Group.objects.get(pk=group_id)
    group.status = 2
    group.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_group_to_lesson(request, group_id):
    access_token = get_access_token(request)
    payload = get_jwt_payload(access_token)
    user_id = payload["user_id"]

    group = Group.objects.get(pk=group_id)

    lesson = Lesson.objects.filter(status=1).filter(user_id=user_id).last()

    if lesson is None:
        lesson = Lesson.objects.create()

    if lesson.groups.contains(group):
        return Response(status=status.HTTP_409_CONFLICT)

    lesson.groups.add(group)
    lesson.user = CustomUser.objects.get(pk=user_id)
    lesson.save()

    serializer = LessonSerializer(lesson)

    response = Response()
    response.data = serializer.data
    response.status_code = status.HTTP_200_OK

    return response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def search_lessons(request):
    token = get_access_token(request)
    payload = get_jwt_payload(token)
    user = CustomUser.objects.get(pk=payload["user_id"])

    offset = int(request.GET.get("offset", 0))
    limit = int(request.GET.get("limit", 5))
    status_id = int(request.GET.get("status", -1))
    date_start = int(request.GET.get("date_start", -1))
    date_end = int(request.GET.get("date_end", -1))

    lessons = Lesson.objects.exclude(status__in=[1, 5]) if user.is_moderator else Lesson.objects.filter(user_id=user.pk)

    if status_id != -1:
        lessons = lessons.filter(status=status_id)

    if date_start != -1:
        lessons = lessons.filter(date_of_formation__gt=datetime.fromtimestamp(date_start / 1000).date())

    if date_end != -1:
        lessons = lessons.filter(date_of_formation__lt=datetime.fromtimestamp(date_end / 1000).date())

    serializer = LessonsSerializer(lessons[offset:offset + limit], many=True)
    resp = {
        "lessons": serializer.data,
        "totalCount": len(lessons)
    }

    return Response(resp)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_lesson_by_id(request, lesson_id):
    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson = Lesson.objects.get(pk=lesson_id)
    serializer = LessonSerializer(lesson, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_lesson(request, lesson_id):
    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson = Lesson.objects.get(pk=lesson_id)
    serializer = LessonSerializer(lesson, data=request.data, many=False, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsRemoteWebService])
def update_lesson_audience(request, lesson_id):
    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson = Lesson.objects.get(pk=lesson_id)

    audience = request.data.get("audience", "")
    if not audience:
        lesson.audience = ""
        lesson.audience_status = 3
        lesson.save()
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson.audience = audience
    lesson.audience_status = 4
    lesson.save()

    return Response(status=status.HTTP_200_OK)


def calculate_lesson_audience(lesson_id):
    data = {
        "lesson_id": lesson_id,
        "access_token": settings.REMOTE_WEB_SERVICE_AUTH_TOKEN,
    }

    requests.post("http://127.0.0.1:8080/calc_audience/", json=data, timeout=3)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_lesson_user(request, lesson_id):
    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson = Lesson.objects.get(pk=lesson_id)
    lesson.status = 2
    lesson.date_of_formation = timezone.now()
    lesson.audience_status = 2
    lesson.save()

    # calculate_lesson_audience(lesson.pk)

    serializer = LessonSerializer(lesson, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
@permission_classes([IsModerator])
def update_lesson_admin(request, lesson_id):
    access_token = get_access_token(request)
    payload = get_jwt_payload(access_token)
    user_id = payload["user_id"]

    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    request_status = int(request.data["status"])
    if request_status not in [3, 4]:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    lesson = Lesson.objects.get(pk=lesson_id)

    if lesson.status != 2:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    lesson.status = request_status
    lesson.date_complete = datetime.now(tz=timezone.utc)
    lesson.moderator = CustomUser.objects.get(pk=user_id)
    lesson.save()

    serializer = LessonSerializer(lesson, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_lesson(request, lesson_id):
    lesson = Lesson.objects.get(pk=lesson_id)

    lesson_status = lesson.status

    if lesson_status not in [1]:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    lesson.status = 5
    lesson.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_group_from_lesson(request, lesson_id, group_id):
    if not Lesson.objects.filter(pk=lesson_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    if not Group.objects.filter(pk=group_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    lesson = Lesson.objects.get(pk=lesson_id)
    lesson.groups.remove(Group.objects.get(pk=group_id))
    lesson.save()

    serializer = GroupSerializer(lesson.groups, many=True)

    groups = [group["id"] for group in serializer.data]

    data = {
        "groups": serializer.data,
        "busy_days": get_busy_days(groups)
    }

    return Response(data)


@api_view(["GET"])
def search_faculties(request):
    query = request.GET.get("query", "")

    facults = Faculty.objects.filter(name__icontains=query)
    serializer = FacultySerializer(facults, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_faculty_by_id(request, faculty_id):
    if not Faculty.objects.filter(pk=faculty_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    faculty = Faculty.objects.get(pk=faculty_id)
    serializer = FacultySerializer(faculty, many=False)

    return Response(serializer.data)


@api_view(["GET"])
def get_faculty_icon(request, faculty_id):
    if not Faculty.objects.filter(pk=faculty_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    faculty = Faculty.objects.get(pk=faculty_id)

    return HttpResponse(faculty.image, content_type="image/png")


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsModerator])
def create_faculty(request):
    faculty = Faculty.objects.create()

    serializer = FacultySerializer(faculty, many=False)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsModerator])
def update_faculty(request, faculty_id):
    if not Faculty.objects.filter(pk=faculty_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    faculty = Faculty.objects.get(pk=faculty_id)
    serializer = FacultySerializer(faculty, data=request.data, many=False, partial=True)

    if serializer.is_valid():
        serializer.save()

    faculties = Faculty.objects.all()
    serializer = FacultySerializer(faculties, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsModerator])
def delete_faculty(request, faculty_id):
    if not Faculty.objects.filter(pk=faculty_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    faculty = Faculty.objects.get(pk=faculty_id)
    faculty.delete()

    faculties = Faculty.objects.all()
    serializer = FacultySerializer(faculties, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def login(request):
    serializer = UserLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(**serializer.data)
    if user is None:
        message = {"message": "invalid credentials"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    access_token = create_access_token(user.id)

    serializer = UserSerializer(
        user,
        context={
            "access_token": access_token
        }
    )

    response = Response(serializer.data, status=status.HTTP_201_CREATED)

    response.set_cookie('access_token', access_token, httponly=False, expires=access_token_lifetime)

    return response


@api_view(["POST"])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_409_CONFLICT)

    user = serializer.save()

    access_token = create_access_token(user.id)

    message = {
        'message': 'User registered successfully',
        'user_id': user.id,
        "access_token": access_token
    }

    response = Response(message, status=status.HTTP_201_CREATED)

    response.set_cookie('access_token', access_token, httponly=False, expires=access_token_lifetime)

    return response


@api_view(["POST"])
def check(request):
    token = get_access_token(request)

    if token is None:
        message = {"message": "Token is not found"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    if token in cache:
        message = {"message": "Token in blacklist"}
        return Response(message, status=status.HTTP_401_UNAUTHORIZED)

    payload = get_jwt_payload(token)
    user_id = payload["user_id"]

    user = CustomUser.objects.get(pk=user_id)
    serializer = UserSerializer(user)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    access_token = get_access_token(request)

    if access_token not in cache:
        cache.set(access_token, access_token_lifetime)

    message = {"message": "Logged out successfully!"}
    response = Response(message, status=status.HTTP_200_OK)

    response.delete_cookie('access_token')

    return response
