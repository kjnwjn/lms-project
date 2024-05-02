<template>
  <div class="container course-detail flex flex-wrap bg-white rounded-md">
    <div class="w-2/3 mt-8">
      <h1 class="text-5xl text-center">
        {{ course.title ? course.title : "NO HEADING" }}
      </h1>
      <h2 class="text-center text-2xl">
        {{ course.summary ? course.summary : "You can grow up you skills" }}
      </h2>
      <div>
        <div class="course-content">
          <show-video-course :listcourseVideo="courseVideo" />
        </div>
        <div>
          <show-course-doc :listCourseDoc="listCourseDoc" />
        </div>
      </div>
    </div>

    <div class="text-center mx-auto mt-10">
      <img
        :src="course.thumbnail ? course.thumbnail : courseDefaultImage"
        alt=""
        class="w-72 rounded-md cursor-pointer"
      />
      <h3 class="text-orange-500 text-4xl mt-5">
        {{ course.credit > 0 && course.credit ? ` ${course.credit}$` : "FREE" }}
        FOR YOU
      </h3>
      <div class="mt-5" v-if="!paidCourse">
        <a
          :href="linktoCheckout"
          class="bg-orange-500 text-3xl text-white px-8 py-3 rounded-xl"
        >
          Buy Now
        </a>
      </div>
      <div class="mt-5" v-if="paidCourse">
        <a
          :href="`/learning/${course.id ? course.id : ''}/${
            courseFirstItem.id ? courseFirstItem.id : ''
          }`"
          class="bg-orange-500 text-3xl text-white px-8 py-3 rounded-xl"
        >
          Start Learning
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import courseService from "@/services/courseService";
import ShowVideoCourse from "./ShowVideoCourse.vue";
import courseDefaultImage from "@/assets/images/course-default.jpg";
import ShowCourseDoc from "./ShowCourseDoc.vue";
import jwt from "jsonwebtoken";
export default {
  components: {
    ShowVideoCourse,
    ShowCourseDoc,
  },
  data() {
    return {
      course: {},
      courseDefaultImage,
      linktoCheckout: "",
      courseVideo: [],
      token: localStorage.getItem("token"),
      decodedToken: null,
      paidCourse: false,
      courseFirstItem: {},
      listCourseDoc: [],
    };
  },
  methods: {
    async getCourseBySlug() {
      try {
        const slug = this.$route.params.slug;
        const response = await courseService.getCourseBySlug(slug);
        this.course = response.data.data;
        this.getCourseVideo();
        this.getListCourseDoc();
        this.checkout();
      } catch (error) {
        console.log(error);
      }
    },
    async getCourseVideo() {
      try {
        const courseId = this.course.id;
        const response = await courseService.studentGetCourseVideos(courseId);
        this.courseVideo = response.data.data;
        this.courseFirstItem = this.courseVideo[0];
      } catch (error) {
        console.log(error);
      }
    },
    async getListCourseDoc() {
      try {
        const courseId = this.course.id;
        const response = await courseService.getListCourseDocByStudent(
          courseId
        );
        this.listCourseDoc = response.data.data;
        console.log(this.listCourseDoc);
      } catch (error) {
        console.log(error);
      }
    },
    async checkout() {
      try {
        const courseId = this.course.id;
        console.log(courseId);
        const response = await courseService.checkoutCourse(courseId);
        this.linktoCheckout = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    parseToken() {
      try {
        // Sử dụng thư viện jsonwebtoken để decode token
        this.decodedToken = jwt.decode(this.token);

        // In thông tin trong token ra console (hoặc sử dụng theo nhu cầu của bạn)
        console.log("Decoded Token:", this.decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    },
    async getCourseByUSerId() {
      try {
        const courseId = this.decodedToken.id;
        const response = await courseService.getCourseByUSerId(courseId);
        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async checkPaidCourse() {
      const userCourse = await this.getCourseByUSerId();
      for (const course of userCourse) {
        if (course.id === this.course.id) {
          this.paidCourse = true;
        }
      }
    },
    async checkError() {
      const error = this.$route.query?.error;
      if (error) {
        this.$toast.error("Payment failed, please try again");
      }
    },
  },
  mounted() {
    this.getCourseBySlug();
    this.parseToken();
  },
  updated() {
    this.checkError();
    this.checkPaidCourse();
  },
};
</script>

<style lang="css" scoped>
.course-detail {
  width: 92%;
  margin: 0 auto;
}
</style>
