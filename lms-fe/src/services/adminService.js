import axos from "axios";

const adminService = {
  async getAlllecturer() {
    const response = await axos.get("user/get-all-records?role=lecturer");
    return response;
  },
  async getAllStudent() {
    const response = await axos.get("user/get-all-records?role=student");
    return response;
  },
  async updateUser(email, data) {
    const response = await axos.patch(`/user/update-profiles/${email}`, data);
    return response;
  },
  async createNewLecturer(data) {
    const response = await axos.post("/user/new?role=lecturer", data);
    return response;
  },
  async createNewStudent(data) {
    const response = await axos.post("/user/new?role=student", data);
    return response;
  },
  async deleteLecturer(email) {
    const response = await axos.delete(`/user/${email}/remove`);
    return response;
  },
  async getAllCourses() {
    const response = await axos.get("/course");
    return response;
  },
  async getAllCoursesByAdmin() {
    const response = await axos.get("/course/admin/get-all");
    return response;
  },
  async CreateNewCourse(data) {
    const response = await axos.post("/course/admin", data);
    return response;
  },
  async UploadThumbnail(courseId, data) {
    const response = await axos.patch(
      `/course/${courseId}/update-thumbnail/admin`,
      data
    );
    return response;
  },
  async getCourseById(courseId) {
    const response = await axos.get(`/course/${courseId}`);
    return response;
  },
  async updateCourse(courseId, data) {
    const response = await axos.patch(`/course/${courseId}`, data);
    return response;
  },
  async activeCourse(id) {
    const response = await axos.patch(`/course/active/${id}`);
    return response;
  },
  async courseVideoByCourseId(data) {
    const response = await axos.post("/course-video", data);
    return response;
  },
  async getListCourseVideo(courseId) {
    const response = await axos.get(
      `/course-video/get-videos-by-course-id?courseId=${courseId}`
    );
    return response;
  },
  async UpLoadCourseVideo(videoId, data) {
    const response = await axos.patch(
      `/course-video/upload-video-file?videoId=${videoId}`,
      data
    );
    return response;
  },
  async createCoureVideo(data) {
    const response = await axos.post("/course-video", data);
    return response;
  },
  async removeCourseVideo(courseVideoId, courseId) {
    const response = await axos.delete(
      `/course-video/delete-video-by-course-id?courseId=${courseId}&videoId=${courseVideoId}`
    );
    return response;
  },

  async getListCourseDocs(courseId) {
    const response = await axos.get(
      `/course-docs/get-docs-by-course-id?courseId=${courseId}`
    );
    return response;
  },
  async createCourseDocs(data) {
    const response = await axos.post("/course-docs", data);
    return response;
  },
  async upLoadCourseDocs(courseDocsId, data) {
    const response = await axos.patch(
      `/course-docs/update-document-file?courseDocsId=${courseDocsId}`,
      data
    );
    return response;
  },
  async removeCourseDocs(courseDocsId, courseId) {
    const response = await axos.delete(
      `/course-docs/delete-docs-by-course-id?courseId=${courseId}&courseDocsId=${courseDocsId}`
    );
    return response;
  },
  async getListQuiz(courseId) {
    const response = await axos.get(
      `/quiz/get-quizs-by-course-id?courseId=${courseId}`
    );
    return response;
  },
  async publishQuiz(id) {
    const response = await axos.patch(`/quiz/${id}/publish`);
    return response;
  },
  async getListQuizQuestionByAdmin(quizId) {
    const response = await axos.get(`/quiz-question/admin/${quizId}/all`);
    return response;
  },
  async createNewQuizQuestion(quizId, data) {
    const response = await axos.post(`/quiz-question/${quizId}`, data);
    return response;
  },
  async removeQuizQuestion(id) {
    const response = await axos.delete(`/quiz-question/${id}`);
    return response;
  },
  async createNewQuizQuestionChoice(id, data) {
    const response = await axos.post(`/quiz-choice/${id}`, data);
    return response;
  },
  async removeQuizQuestionChoice(id) {
    const response = await axos.delete(`/quiz-choice/${id}`);
    return response;
  },
  async createNewQuiz(data) {
    const response = await axos.post("/quiz/new", data);
    return response;
  },
  async getAllLevels() {
    const response = await axos.get("level");
    return response;
  },
  async getListCategory() {
    const response = await axos.get(`/category`);
    return response;
  },
  async createNewCategory(data) {
    const response = await axos.post(`/category`, data);
    return response;
  },
  async removeCategory(id) {
    const response = await axos.delete(`/category/${id}`);
    return response;
  },
  async updateCategory(id, data) {
    const response = await axos.patch(`/category/${id}`, data);
    return response;
  },
  async getListBlog() {
    const response = await axos.get(`/blog`);
    return response;
  },
  async createNewBlog(data) {
    const response = await axos.post(`/blog`, { ...data });
    return response;
  },
  async createUpdateBlog(id, data) {
    const response = await axos.patch(`/blog/${id}`, data);
    return response;
  },
  async removeBlog(id) {
    const response = await axos.delete(`/blog/${id}`);
    return response;
  },
};
export default adminService;
