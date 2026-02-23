import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseStructure } from "@/services/courseService";

type Lesson = {
  id: number;
  title: string;
  content?: string;
  video_url?: string;
  order: number;
};

type Section = {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
};

function CoursePlayerPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const [sections, setSections] = useState<Section[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  useEffect(() => {
    fetchStructure();
  }, [id]);

  const fetchStructure = async () => {
  try {
    const data = await getCourseStructure(courseId);
    console.log("STRUCTURE DATA:", data); // 👈 ADD THIS

    setSections(data);

    if (data.length > 0 && data[0].lessons.length > 0) {
      setSelectedLesson(data[0].lessons[0]);
    }
  } catch {
    alert("Failed to load course structure");
  }
};


  const toggleSection = (sectionId: number) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-background">

      {/* MAIN CONTENT */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto">

          {/* VIDEO AREA */}
          <div className="bg-black text-white p-6">
            {selectedLesson ? (
              <>
                <h1 className="text-2xl font-bold mb-4">
                  {selectedLesson.title}
                </h1>

                {selectedLesson.video_url ? (
                  <video
                    src={selectedLesson.video_url}
                    controls
                    className="w-full h-[70vh] object-contain rounded"
                  />
                ) : (
                  <div className="w-full h-[70vh] flex items-center justify-center">
                    <p>No video available</p>
                  </div>
                )}
              </>
            ) : (
              <div className="w-full h-[70vh] flex items-center justify-center">
                <p>No content available</p>
              </div>
            )}
          </div>

          {/* OVERVIEW */}
          <div className="bg-card p-8 border-t border-border">
            <h2 className="text-xl font-bold mb-3">
              Lesson Overview
            </h2>

            <p className="text-muted-foreground">
              {selectedLesson?.content ||
                "No overview available for this lesson."}
            </p>
          </div>

        </div>
      </div>

      {/* SIDEBAR */}
      <div className="w-96 bg-card border-l border-border p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">
          Course Content
        </h2>

        {sections.map(section => (
          <div key={section.id} className="mb-4">

            {/* SECTION HEADER */}
            <div
              className="cursor-pointer font-semibold bg-muted p-3 rounded hover:opacity-80 transition"
              onClick={() => toggleSection(section.id)}
            >
              {section.title}
            </div>

            {/* LESSONS */}
            {expandedSections.includes(section.id) && (
              <div className="mt-2 ml-2">
                {section.lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className={`p-2 rounded cursor-pointer mb-1 transition ${
                      selectedLesson?.id === lesson.id
                        ? "bg-muted font-semibold"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {lesson.title}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default CoursePlayerPage;
