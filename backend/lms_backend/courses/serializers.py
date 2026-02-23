from rest_framework import serializers
from .models import Course, Section, Lesson, Enrollment


# -------------------------
# Course
# -------------------------

class CourseSerializer(serializers.ModelSerializer):
    creator_email = serializers.EmailField(
        source="creator.email",
        read_only=True
    )

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "creator_email",
            "created_at",
        ]


# -------------------------
# Lesson
# -------------------------

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = [
            "id",
            "section",
            "title",
            "content",
            "video_url",
            "order"
        ]


# -------------------------
# Section (Nested Lessons)
# -------------------------

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


# -------------------------
# Enrollment
# -------------------------

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = [
            "id",
            "course",
            "enrolled_at"
        ]
