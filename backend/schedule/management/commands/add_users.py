from django.core.management import BaseCommand

from schedule.models import CustomUser


def add_users():
    CustomUser.objects.create_user("user", "user@user.com", "1234")
    CustomUser.objects.create_superuser("root", "root@root.com", "1234")

    for user_id in range(2, 10):
        CustomUser.objects.create_user(f"user{user_id}", f"user{user_id}@user.com", "1234")

    print("Пользователи созданы")


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        add_users()

