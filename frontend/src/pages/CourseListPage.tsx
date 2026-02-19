import { useEffect, useState } from "react";
import { getCourses, enrollInCourse } from "@/services/courseService";
import type { Course } from "@/services/courseService";
import authorization from "@/core/Authorization";
import { Button } from "@/components/ui/button";

function CourseListPage() {
  console.log("CourseListPage rendered");

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        console.log("Fetched courses:", data);
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId: number) => {
  try {
    await enrollInCourse(courseId);
    alert("Enrolled successfully!");

    // Optional: refetch courses after enroll
    const updatedCourses = await getCourses();
    setCourses(updatedCourses);
  } catch (error: any) {
    const message =
      error.response?.data?.detail || "Enrollment failed";
    alert(message);
  }
};


  if (loading) {
    return <div className="p-8">Loading courses...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">All Courses</h1>

      {courses.length === 0 && <p>No courses available.</p>}

      {courses.map((course) => {
        console.log("Rendering button for course:", course.id);

        return (
          <div
            key={course.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">
                {course.description}
              </p>
            </div>

            {authorization.isAuthorized("can_enroll_course") && (
              <Button
                type="button"
                onClick={() => handleEnroll(course.id)}
              >
                Enroll
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CourseListPage;
