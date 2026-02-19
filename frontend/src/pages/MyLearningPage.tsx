import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyLearning } from "@/services/courseService";

interface Course {
  id: number;
  title: string;
  description?: string;
}

function MyLearningPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await getMyLearning();
      setCourses(data);
    } catch (error) {
      alert("Failed to load enrolled courses");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">My Learning</h1>

      {courses.length === 0 ? (
        <p>No enrolled courses yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-6 shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <h2 className="text-xl font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-gray-600">
                {course.description || "No description"}
              </p>

              <button className="mt-4 text-blue-600">
                Continue Learning →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearningPage;
