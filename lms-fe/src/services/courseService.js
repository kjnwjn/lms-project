import axios from "axios";

const courseService = {
  async getCourseBySlug(slug) {
    const response = await axios.get(`/course/slug/${slug}`);
    return response;
  },
  async studentGetCourseVideos(courseId) {
    const response = await axios.get(
      `/course-video/get-videos-by-course-id/student?courseId=${courseId}`
    );
    return response;
  },
  async checkoutCourse(courseId) {
    const response = await axios.post(`/payment/checkout?courseId=${courseId}`);
    return response;
  },
  async getCourseByUSerId(userId) {
    const responese = await axios.get(`/course/user/${userId}`);
    return responese;
  },
  async getCourseById(courseId) {
    const response = await axios.get(`/course/${courseId}`);
    return response;
  },
  async studentGetContentVideo(courseId, videoId) {
    const response = await axios.get(
      `/course-video/get-video-url/student?courseId=${courseId}&videoId=${videoId}`
    );
    return response;
  },
  async getCourseDoc(courseId) {
    const response = await axios.get(
      `/course-docs/get-docs-by-course-id?courseId=${courseId}`
    );
    return response;
  },
  async uploadCourseDoc(courseDocId, data) {
    const response = await axios.patch(
      `/course-docs/update-document-file?courseDocsId=${courseDocId}`,
      data
    );
    return response;
  },
  async createCourseDoc(data) {
    const response = await axios.post(`/course-docs`, data);
    return response;
  },
  async deleteCourseDoc(courseId, courseDocId) {
    const response = await axios.delete(
      `/course-docs/delete-docs-by-course-id?courseId=${courseId}&courseDocsId=${courseDocId}`
    );
    return response;
  },
  async getListCourseDocByStudent(courseId) {
    const response = await axios.get(
      `/course-docs/get-docs-by-course-id/student?courseId=${courseId}`
    );
    return response;
  },
  async getURLCourseDoc(courseId, courseDocId) {
    const response = await axios.get(
      `/course-docs/get-docs-url/student?courseId=${courseId}&courseDocsId=${courseDocId}`
    );
    return response;
  },
};

export default courseService;
