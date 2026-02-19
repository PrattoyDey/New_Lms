from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from .models import Course, CourseContent, Enrollment, Section
from .serializers import CourseSerializer, LessonSerializer
# from .permissions import (
#     CanCreateCourse,
#     CanUpdateCourse,
#     CanDeleteCourse,
#     CanEnrollCourse,
# )
from accounts.permissions import IsAuthorized
from .serializers import CourseContentSerializer
from .serializers import SectionSerializer

class CourseListView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(creator=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CourseUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def put(self, request, pk):
        course = Course.objects.get(pk=pk)

        # Creator can only edit their own course
        if course.creator != request.user and request.user.role != "ADMIN":
            return Response({"detail": "Not allowed"}, status=403)

        serializer = CourseSerializer(course, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CourseDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def delete(self, request, pk):
        course = Course.objects.get(pk=pk)

        if course.creator != request.user and request.user.role != "ADMIN":
            return Response({"detail": "Not allowed"}, status=403)

        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EnrollCourseView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def post(self, request, pk):
        course = Course.objects.get(pk=pk)

        enrollment, created = Enrollment.objects.get_or_create(
            student=request.user,
            course=course
        )

        if not created:
            return Response(
                {"detail": "Already enrolled"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"detail": "Enrolled successfully"},
            status=status.HTTP_201_CREATED
        )


class MyEnrollmentsView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]

    def get(self, request):
        enrollments = Enrollment.objects.filter(student=request.user)
        courses = [en.course for en in enrollments]
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

class MyLearningView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        enrollments = Enrollment.objects.filter(student=request.user)

        course_ids = enrollments.values_list("course_id", flat=True)

        courses = Course.objects.filter(id__in=course_ids)

        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    

class CourseContentListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        contents = CourseContent.objects.filter(course_id=course_id)
        serializer = CourseContentSerializer(contents, many=True)
        return Response(serializer.data)

class CourseContentCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_update_course"

    def post(self, request):
        serializer = LessonSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)

    
class MyCoursesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = Course.objects.filter(creator=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)


class CourseStructureView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, course_id):
        sections = Section.objects.filter(course_id=course_id)
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)


class SectionCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAuthorized]
    required_permission = "can_update_course"

    def post(self, request):
        serializer = SectionSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
