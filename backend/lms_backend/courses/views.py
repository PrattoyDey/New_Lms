from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Course, Enrollment, Section, Lesson
from .serializers import CourseSerializer, SectionSerializer, LessonSerializer
from accounts.permissions import IsAuthorized


# ------------------------
# Course Views
# ------------------------

class CourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_create_course"

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class CourseUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_update_course"

    def put(self, request, pk):
        course = Course.objects.get(pk=pk)

        if course.creator != request.user and request.user.role != "ADMIN":
            return Response({"detail": "Not allowed"}, status=403)

        serializer = CourseSerializer(course, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CourseDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_delete_course"

    def delete(self, request, pk):
        course = Course.objects.get(pk=pk)

        if course.creator != request.user and request.user.role != "ADMIN":
            return Response({"detail": "Not allowed"}, status=403)

        course.delete()
        return Response(status=204)


# ------------------------
# Enrollment
# ------------------------

class EnrollCourseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        course = Course.objects.get(pk=pk)

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )

        if not created:
            return Response(
                {"detail": "Already enrolled"},
                status=400
            )

        return Response(
            {"detail": "Enrolled successfully"},
            status=201
        )


class MyLearningView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        enrollments = Enrollment.objects.filter(student=request.user)
        courses = [en.course for en in enrollments]
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class MyCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(creator=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


# ------------------------
# Section
# ------------------------

class SectionCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_update_course"

    def post(self, request):
        serializer = SectionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


# ------------------------
# Lesson
# ------------------------

class LessonCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_update_course"

    def post(self, request):
        serializer = LessonSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


# ------------------------
# Nested Course Structure
# ------------------------

class CourseStructureView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):

        is_creator = Course.objects.filter(
            id=course_id,
            creator=request.user
        ).exists()

        is_enrolled = Enrollment.objects.filter(
            student=request.user,
            course_id=course_id
        ).exists()

        is_admin = request.user.role == "ADMIN"

        if not (is_creator or is_enrolled or is_admin):
            return Response({"error": "Not allowed"}, status=403)

        sections = Section.objects.filter(course_id=course_id)

        serializer = SectionSerializer(sections, many=True)

        return Response(serializer.data)
