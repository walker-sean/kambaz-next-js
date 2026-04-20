import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: any) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axios.post(`${QUIZZES_API}`, quiz);
  return data;
};

export const findQuizById = async (quizId: any) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const updateQuiz = async (quizId: any, updatedQuiz: any) => {
  const { data } = await axios.put(`${QUIZZES_API}/${quizId}`, updatedQuiz);
  return data;
};

export const deleteQuiz = async (quizId: any) => {
  await axios.delete(`${QUIZZES_API}/${quizId}`);
};

export const addQuestionToQuiz = async (quizId: any, question: any) => {
  const { data } = await axios.post(`${QUIZZES_API}/${quizId}`, question);
  return data;
};

export const updateQuizQuestion = async (
  quizId: any,
  questionId: any,
  updatedQuestion: any,
) => {
  const { data } = await axios.put(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`,
  );
  return data;
};

export const deleteQuizQuestion = async (quizId: any, questionId: any) => {
  await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
};

export const makeAttempt = async (quizId: any, attempt: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/attempts`,
  );
  return data;
};

export const findQuizAttempts = async (quizId: any) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts`,
  );
  return data;
};

export const findLastQuizAttempt = async (quizId: any) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/attempts/last`,
  );
  return data;
};

export const findCourseQuizAttempts = async (courseId: any) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/attempts`,
  );
  return data;
};
