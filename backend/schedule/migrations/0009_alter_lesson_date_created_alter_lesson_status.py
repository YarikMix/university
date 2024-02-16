# Generated by Django 4.2.5 on 2023-12-13 22:41

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0008_alter_lesson_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 13, 22, 41, 44, 507179, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='status',
            field=models.IntegerField(choices=[(1, 'Введён'), (2, 'В работе'), (3, 'Завершен'), (4, 'Отклонен'), (5, 'Удален')], default=1, verbose_name='Статус'),
        ),
    ]