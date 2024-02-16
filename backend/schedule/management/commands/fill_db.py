import random
from tqdm import tqdm
from math import ceil

from django.core import management
from django.core.management.base import BaseCommand
from schedule.models import *
from schedule.utils.data import *
from schedule.utils.utils import random_date, random_timedelta, log
from progress.bar import IncrementalBar


def add_faculties():
    faculties = [
        Faculty(
            name="ИУ",
            image="facults/ИУ.png"
        ),
        Faculty(
            name="ФН",
            image="facults/ФН.png"
        ),
        Faculty(
            name="РК",
            image="facults/РК.png"
        ),
        Faculty(
            name="МТ",
            image="facults/МТ.png"
        ),
        Faculty(
            name="СМ",
            image="facults/СМ.png"
        ),
        Faculty(
            name="ИБМ",
            image="facults/ИБМ.png"
        ),
        Faculty(
            name="Э",
            image="facults/Э.png"
        )
    ]

    Faculty.objects.bulk_create(faculties)

    log("Факультеты добавлены")


def add_groups(count):
    faculties = Faculty.objects.all()

    last_group_id = 1
    if Group.objects.count() > 0:
        last_group_id = Group.objects.last().id + 1

    groups_bar = IncrementalBar('Группы', max=count)

    for group_id in range(last_group_id, last_group_id + count):
        faculty = random.choice(faculties)
        education_type = random.choice([1, 1, 2, 2, 3])

        if education_type == 1:
            term = random.randint(1, 8)
        elif education_type == 2:
            term = random.randint(1, 12)
        else:
            term = random.randint(1, 4)

        course = ceil(term / 2)

        index = 10 * term + group_id % 5 + 1
        if education_type == 3:
            index += 100

        name = faculty.name + str(random.randint(1, 10)) + "-" + str(index)

        year_begin = random.randint(2000, 2023)
        if education_type == 1:
            year_end = year_begin + 4
        elif education_type == 2:
            year_end = year_begin + 6
        else:
            year_end = year_begin + 2

        group = Group(
            pk=group_id,
            name=name,
            faculty=faculty,
            term=term,
            course=course,
            education_type=education_type,
            year_begin=year_begin,
            year_end=year_end
        )

        group.save()
        groups_bar.next()

    groups_bar.finish()
    log("Группы добавлены")


def add_lessons(count):
    users = CustomUser.objects.filter(is_moderator=False)
    moderators = CustomUser.objects.filter(is_moderator=True)

    groups = Group.objects.all()

    for _ in tqdm(range(count)):
        lesson = Lesson.objects.create()
        lesson.status = random.randint(2, 5)

        if lesson.status in [3, 4]:
            lesson.date_complete = random_date()
            lesson.date_of_formation = lesson.date_complete - random_timedelta()
            lesson.date_created = lesson.date_of_formation - random_timedelta()
            lesson.moderator = random.choice(moderators)
        else:
            lesson.date_of_formation = random_date()
            lesson.date_created = lesson.date_of_formation - random_timedelta()

        lesson.audience_status = 1

        if lesson.status in [2, 3, 4]:
            if random.random() < 0.2:
                lesson.audience_status = 3
            else:
                lesson.audience_status = 4
                lesson.audience = random.choice(audiences)

        lesson.user = random.choice(users)
        lesson.teacher = random.choice(teachers)
        lesson.discipline = random.choice(disciplines)
        lesson.time = random.randint(1, 7)
        lesson.day_of_week = random.randint(1, 6)

        for i in range(random.randint(1, 3)):
            lesson.groups.add(random.choice(groups))

        lesson.save()

    log("Занятия добавлены")


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('ratio', nargs='+', type=int, help='Ratio value')

    def handle(self, *args, **kwargs):

        management.call_command("clean_db")

        ratio = kwargs['ratio'][0]

        GROUPS_RATIO = 10 * ratio
        LESSONS_RATIO = 10 * ratio

        add_faculties()
        add_groups(GROUPS_RATIO)
        add_lessons(LESSONS_RATIO)







