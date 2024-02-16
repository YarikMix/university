from django.core.management.base import BaseCommand
from schedule.models import *


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        Group.objects.all().delete()
        Faculty.objects.all().delete()
        Lesson.objects.all().delete()