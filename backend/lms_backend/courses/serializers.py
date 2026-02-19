from rest_framework import serializers
from .models import Course, CourseContent, Enrollment
from .models import Section



class CourseContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseContent
        fields = ["id",
            "course",
            "title",
            "content",
            "video_url"]


class CourseSerializer(serializers.ModelSerializer):
    contents = CourseContentSerializer(many=True, read_only=True)
    creator_email = serializers.EmailField(source="creator.email", read_only=True)

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "creator_email",
            "created_at",
            "contents",
        ]


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ["id", "course", "enrolled_at"]



class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseContent
        fields = [
            "id",
            "course",
            "section",
            "title",
            "content",
            "video_url",
            "order"
        ]



class SectionSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = [
            "id",
            "course",
            "title",
            "order",
            "lessons"
        ]
