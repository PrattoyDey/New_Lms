import api from "./api";

export interface Course {
  id: number;
  title: string;
  description: string;
  creator_email: string;
}

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

export const getCourseContents = async (courseId: number) => {
  const response = await api.get(`/courses/${courseId}/contents/`);
  return response.data;
};

export const addCourseContent = async (data: any) => {
  const response = await api.post("/courses/add-content/", data);
  return response.data;
};

export const getMyCourses = async () => {
  const response = await api.get("/courses/my-courses/");
  return response.data;
};

export const getCourseStructure = async (courseId: number) => {
  const response = await api.get(`/courses/${courseId}/structure/`);
  return response.data;
};
