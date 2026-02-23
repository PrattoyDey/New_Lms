import api from "./api";

/* ================= TYPES ================= */

export interface Course {
  id: number;
  title: string;
  description: string;
  creator_email: string;
}

/* ================= COURSES ================= */

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get<Course[]>("/courses/");
  return response.data;
};

export const createCourse = async (
  title: string,
  description: string
) => {
  return api.post("/courses/create/", {
    title,
    description,
  });
};

export const enrollInCourse = async (courseId: number) => {
  return api.post(`/courses/${courseId}/enroll/`);
};

export const getMyLearning = async () => {
  const response = await api.get("/courses/my-learning/");
  return response.data;
};

export const getMyCourses = async () => {
  const response = await api.get("/courses/my-courses/");
  return response.data;
};

/* ================= STRUCTURE ================= */

export const getCourseStructure = async (courseId: number) => {
  const response = await api.get(`/courses/${courseId}/structure/`);
  return response.data;
};

/* ================= SECTIONS ================= */

export const createSection = async (data: {
  course: number;
  title: string;
  order: number;
}) => {
  const response = await api.post("/courses/add-section/", data);
  return response.data;
};

/* ================= LESSONS ================= */

export const addLesson = async (data: {
  course: number;
  section: number;
  title: string;
  content?: string;
  video_url?: string;
  order: number;
}) => {
  const response = await api.post("/courses/add-lesson/", data);
  return response.data;
};
