from django.contrib import admin

from .models import *

admin.site.register(Group)
admin.site.register(Lesson)
admin.site.register(Faculty)
admin.site.register(CustomUser)
