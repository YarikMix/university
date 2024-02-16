from rest_framework import serializers

from .models import *


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    faculty = FacultySerializer(read_only=True, many=False)

    class Meta:
        model = Group
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    access_token = serializers.SerializerMethodField()

    def get_access_token(self, user):
        return self.context.get("access_token", "")

    class Meta:
        model = CustomUser
        fields = ('id', 'name', 'email', 'is_moderator', 'access_token')


class LessonSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(read_only=True, many=True)
    user = UserSerializer(read_only=True, many=False)
    moderator = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Lesson
        fields = "__all__"


class LessonsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    moderator = UserSerializer(read_only=True, many=False)

    class Meta:
        model = Lesson
        fields = "__all__"


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'password', 'name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            name=validated_data['name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

