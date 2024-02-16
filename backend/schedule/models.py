from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser


class Faculty(models.Model):
    name = models.CharField(default="Название", max_length=100, verbose_name="Название")
    image = models.ImageField(default="facults/default.png", verbose_name="Картинка")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Факультет"
        verbose_name_plural = "Факультеты"


class Group(models.Model):
    STATUS_CHOICES = (
        (1, 'Действует'),
        (2, 'Удалена'),
    )

    EDUCATION_TYPE_CHOICES = (
        (1, 'Бакалавриат'),
        (2, 'Специалитет'),
        (3, 'Магистратура'),
        (4, 'Аспирантура')
    )

    COURSE_CHOICES = (
        (1, 'Первый'),
        (2, 'Второй'),
        (3, 'Третий'),
        (4, 'Четвертый'),
        (5, 'Пятый'),
        (6, 'Шестой')
    )

    TERMS_CHOICES = (
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
        (6, 6),
        (7, 7),
        (8, 8),
    )

    name = models.CharField(max_length=100, default="Название группы", verbose_name="Название")
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, verbose_name="Статус")
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, verbose_name="Факультет", blank=True, null=True)
    course = models.IntegerField(default=1, choices=COURSE_CHOICES, verbose_name="Курс")
    term = models.IntegerField(default=1, choices=TERMS_CHOICES, verbose_name="Семестр")
    education_type = models.IntegerField(default=1, choices=EDUCATION_TYPE_CHOICES, verbose_name="Вариант обучения")
    year_begin = models.IntegerField(default=2023, verbose_name="Год начала обучения")
    year_end = models.IntegerField(default=2027, verbose_name="Год конца обучения")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Учебная группа"
        verbose_name_plural = "Учебные группы"
        ordering = ('-id', )


class CustomUserManager(BaseUserManager):
    def create_user(self, name, email, password="1234", **extra_fields):
        extra_fields.setdefault('name', name)
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, name, email, password="1234", **extra_fields):
        extra_fields.setdefault('is_moderator', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(name, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=30)
    is_moderator = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class Lesson(models.Model):
    STATUS_CHOICES = (
        (1, 'Введён'),
        (2, 'В работе'),
        (3, 'Завершен'),
        (4, 'Отклонен'),
        (5, 'Удален'),
    )

    AUDIENCE_STATUS_CHOICES = (
        (1, "Не найдена"),
        (2, "Вычисляется"),
        (3, "Не удалось найти"),
        (4, "Найдена")
    )

    DAY_OF_WEEK_CHOICES = (
        (1, 'Понедельник'),
        (2, 'Вторник'),
        (3, 'Среда'),
        (4, 'Четверг'),
        (5, 'Пятница'),
        (6, 'Суббота')
    )

    LESSON_TIME_CHOICES = (
        (1, '8:30'),
        (2, '10:15'),
        (3, '12:00'),
        (4, '13:50'),
        (5, '15:40'),
        (6, '17:25'),
        (7, '19:10')
    )

    discipline = models.CharField(default="", verbose_name="Дисциплина", blank=True)
    teacher = models.CharField(default="", verbose_name="Преподаватель", blank=True)
    groups = models.ManyToManyField(Group, verbose_name="Группа", null=False)
    time = models.IntegerField(default=1, choices=LESSON_TIME_CHOICES, verbose_name="Время начала")
    day_of_week = models.IntegerField(default=1, choices=DAY_OF_WEEK_CHOICES, verbose_name="День недели")

    audience = models.CharField(default="", verbose_name="Аудитория", blank=True)
    audience_status = models.IntegerField(default=1, verbose_name="Статус аудитории")

    status = models.IntegerField(choices=STATUS_CHOICES, default=1, verbose_name="Статус", db_index=True)

    date_created = models.DateTimeField(default=timezone.now(), verbose_name="Дата создания")
    date_of_formation = models.DateTimeField(verbose_name="Дата формирования", null=True, db_index=True)
    date_complete = models.DateTimeField(verbose_name="Дата завершения", blank=True, null=True)

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Пользователь", null=True, related_name='user')
    moderator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name="Модератор", null=True, related_name='moderator')

    def __str__(self):
        return "Занятие №" + str(self.pk)

    class Meta:
        verbose_name = "Занятие"
        verbose_name_plural = "Занятия"
        ordering = ('-date_of_formation', )