# Generated by Django 4.2.5 on 2023-12-11 12:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0004_alter_lesson_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lesson',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 12, 11, 12, 46, 17, 766994, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='date_of_formation',
            field=models.DateTimeField(null=True, verbose_name='Дата формирования'),
        ),
        migrations.AlterField(
            model_name='lesson',
            name='status',
            field=models.IntegerField(choices=[(1, 'Введён'), (2, 'В работе'), (3, 'Завершен'), (4, 'Отклонен'), (5, 'Удален')], default=1, verbose_name='Статус'),
        ),
    ]
