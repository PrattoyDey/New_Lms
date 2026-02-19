from django.urls import path
from .views import (
    CourseListView,
    CourseCreateView,
    CourseUpdateView,
    CourseDeleteView,
    EnrollCourseView,
    MyEnrollmentsView,
    MyLearningView,
    CourseContentListView,
    CourseContentCreateView,
    MyCoursesView,
    CourseStructureView,
    SectionCreateView,
    
)

urlpatterns = [
    path("", CourseListView.as_view()),
    path("create/", CourseCreateView.as_view()),
    path("<int:pk>/update/", CourseUpdateView.as_view()),
    path("<int:pk>/delete/", CourseDeleteView.as_view()),
    path("<int:pk>/enroll/", EnrollCourseView.as_view()),
    path("my-enrollments/", MyEnrollmentsView.as_view()),
    path("my-learning/", MyLearningView.as_view()),
    path("<int:course_id>/contents/", CourseContentListView.as_view()),
    path("add-content/", CourseContentCreateView.as_view()),
    path("my-courses/", MyCoursesView.as_view()),
    path("<int:course_id>/structure/", CourseStructureView.as_view()),
    path("add-section/", SectionCreateView.as_view()),

]
