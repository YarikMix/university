import random
from datetime import datetime, timedelta
from django.utils import timezone

from schedule.models import Group


def random_date():
    now = datetime.now(tz=timezone.utc)
    return now + timedelta(random.uniform(-1, 0) * 100)


def random_timedelta(factor=100):
    return timedelta(random.uniform(0, 1) * factor)


def get_last_group_id():
    last_group = Group.objects.first()

    if last_group is None:
        return 0

    return last_group.pk + 1


def log(message):
    print(datetime.now().strftime("%d.%b %Y %H:%M:%S"), message)