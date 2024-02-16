from django.core.management import BaseCommand

from schedule.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        CustomUser.objects.all().delete()

