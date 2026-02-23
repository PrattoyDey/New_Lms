import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCourses } from "@/services/courseService";

type Course = {
  id: number;
  title: string;
  description: string;
};

function CreatorDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getMyCourses();
      setCourses(data);
    } catch {
      console.error("Failed to load courses");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">
        My Created Courses
      </h1>

      {courses.length === 0 ? (
        <p>No courses created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {course.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/manage-course/${course.id}`)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Manage
                </button>

                <button
                  onClick={() =>
                    navigate(`/courses/${course.id}`)
                  }
                  className="bg-gray-800 text-white px-4 py-2 rounded"
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CreatorDashboardPage;