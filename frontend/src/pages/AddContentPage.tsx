import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addCourseContent } from "@/services/courseService";

function AddContentPage() {
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = async () => {
    if (!courseId) {
      alert("Invalid course");
      return;
    }

    try {
      await addCourseContent({
        course: Number(courseId),
        title,
        content,
        video_url: videoUrl,
      });

      alert("Content added successfully");
    } catch {
      alert("Failed to add content");
    }
  };

  return (
    <div className="p-10 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">
        Add Lesson
      </h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Lesson Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Lesson Description"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Content
      </button>
    </div>
  );
}

export default AddContentPage;
