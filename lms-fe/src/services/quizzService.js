import axios from "axios";

const quizService = {
  async getQuizByCourseId(courseId) {
    const response = await axios.get(
      `/quiz/get-all-by-course-id/student?courseId=${courseId}`
    );
    return response;
  },
  async getAllQuestionInQuiz(quizId) {
    const response = await axios.get(`quiz-question/${quizId}/all`);
    return response;
  },
  async createQuizSitting(courseId, quizId) {
    const response = await axios.post("/quiz-sitting/start", {
      courseId,
      quizId,
    });
    return response;
  },
  async submitQuizz(sittingId, data) {
    const response = await axios.post(
      `/quiz-sitting/${sittingId}/submit`,
      data
    );
    return response;
  },
  async quizzFinish(data, sittingId) {
    const response = await axios.post(
      `/quiz-sitting/${sittingId}/finish`,
      data
    );
    return response;
  },
  async getResult(quizId, sittingId) {
    const response = await axios.get(
      `quiz-sitting/student/${quizId}/${sittingId}`
    );
    return response;
  },
  async getQuizSitting(quizId) {
    const response = await axios.get(`/quiz-sitting/get-all/student/${quizId}`);
    return response;
  },
};

export default quizService;
