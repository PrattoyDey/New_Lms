from django.urls import path
from .views import (
    CourseListView,
    CourseCreateView,
    CourseUpdateView,
    CourseDeleteView,
    EnrollCourseView,
    MyLearningView,
    MyCoursesView,
    SectionCreateView,
    LessonCreateView,
    CourseStructureView,
)

urlpatterns = [
    # Courses
    path("", CourseListView.as_view()),
    path("create/", CourseCreateView.as_view()),
    path("<int:pk>/update/", CourseUpdateView.as_view()),
    path("<int:pk>/delete/", CourseDeleteView.as_view()),

    # Enrollment
    path("<int:pk>/enroll/", EnrollCourseView.as_view()),
    path("my-learning/", MyLearningView.as_view()),

    # Creator
    path("my-courses/", MyCoursesView.as_view()),

    # Sections
    path("add-section/", SectionCreateView.as_view()),

    # Lessons
    path("add-lesson/", LessonCreateView.as_view()),

    # Nested Structure
    path("<int:course_id>/structure/", CourseStructureView.as_view()),
]


# courses/ - GET (list), POST (create)
# courses/<id>/ - GET (detail), PUT/PATCH (update), DELETE (delete)