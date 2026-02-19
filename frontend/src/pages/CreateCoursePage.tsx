import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "@/services/courseService";
import { Button } from "@/components/ui/button";

function CreateCoursePage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim() || !description.trim()) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createCourse(title, description);
      alert("Course created successfully!");
      navigate("/courses");
    } catch (error: any) {
      const message =
        error.response?.data?.detail ||
        "Failed to create course";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6 border p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">
          Create Course
        </h1>

        <input
          className="w-full border p-2 rounded"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          type="button"
          onClick={handleCreate}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </div>
  );
}

export default CreateCoursePage;
