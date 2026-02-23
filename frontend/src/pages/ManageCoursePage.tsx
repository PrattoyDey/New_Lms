import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCourseStructure,
  createSection,
  addLesson
} from "@/services/courseService";

type Lesson = {
  id: number;
  title: string;
};

type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

function ManageCoursePage() {
  const { id } = useParams();
  const courseId = Number(id);

  const [sections, setSections] = useState<Section[]>([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState<number | null>(null);

  useEffect(() => {
    fetchStructure();
  }, [id]);

  const fetchStructure = async () => {
    const data = await getCourseStructure(courseId);
    setSections(data);
  };

  const handleAddSection = async () => {
    await createSection({
      course: courseId,
      title: sectionTitle,
      order: sections.length + 1,
    });

    setSectionTitle("");
    fetchStructure();
  };

  const handleAddLesson = async () => {
    if (!selectedSection) {
      alert("Select a section first");
      return;
    }

    await addLesson({
      course: courseId,
      section: selectedSection,
      title: lessonTitle,
      content: "",
      video_url: "",
      order: 1,
    });

    setLessonTitle("");
    fetchStructure();
  };

  return (
    <div className="p-10 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Manage Course
      </h1>

      {/* Add Section */}
      <div className="mb-6">
        <input
          className="border p-2 mr-2"
          placeholder="New Section Title"
          value={sectionTitle}
          onChange={(e) => setSectionTitle(e.target.value)}
        />
        <button
          onClick={handleAddSection}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Section
        </button>
      </div>

      {/* Sections List */}
      {sections.map((section) => (
        <div key={section.id} className="border p-4 mb-4 rounded">
          <h2 className="font-bold text-lg mb-2">
            {section.title}
          </h2>

          {section.lessons.map((lesson) => (
            <div key={lesson.id} className="ml-4 text-gray-600">
              • {lesson.title}
            </div>
          ))}

          <button
            onClick={() => setSelectedSection(section.id)}
            className="mt-2 text-sm text-blue-600"
          >
            Add Lesson Here
          </button>
        </div>
      ))}

      {/* Add Lesson Input */}
      {selectedSection && (
        <div className="mt-6">
          <input
            className="border p-2 mr-2"
            placeholder="Lesson Title"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <button
            onClick={handleAddLesson}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add Lesson
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageCoursePage;