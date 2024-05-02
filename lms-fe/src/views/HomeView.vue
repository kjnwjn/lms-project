<template>
  <div class="container">
    <div class="block-1 flex">
      <div class="block-1-1">
        <p class="text-8xl pr-9 text-white block-1-1_p">
          <span class="" style="color: #bea0ff">Best courses</span> are waiting
          to enrich your skill
        </p>
        <p style="color: #b0b0d1; font-size: 25px; margin-top: 30px">
          Provides you with the latest online learning system and material that
          help your knowledge growing.
        </p>
      </div>

      <img src="@/assets/images/body_1.png" class="img_block-1" alt="Want t" />
    </div>
    <div class="view-course mb-4">
      <h1 class="text-5xl text-white mb-8">
        Popular <span class="text-button">Courses</span>
      </h1>
      <div class="courses">
        <CourseComponent
          v-for="(course, index) in courses.slice(0, 6)"
          :key="index"
          :course="course"
          class="course"
        />
      </div>
    </div>

    <div class="flex flex-col md:flex-row mt-20 mb-10">
      <div class="w-full md:w-1/3">
        <div>
          <span class="text-textColor text-3xl sm:text-4xl md:text-5xl">
            What is our <span class="text-button">difference</span>
          </span>
        </div>

        <div class="text-textColor text-xl md:text-2xl mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. ex ea
          commodo consequat. ut labore et dolore magna aliqua. ex ea commodo
          consequat.
        </div>

        <!-- <div class="mt-10">
          <router-link
            to="/about"
            class="text-white px-5 py-3 bg-button rounded-full"
          >
            Learn more
          </router-link>
        </div> -->
      </div>
      <div class="w-full md:w-1/3 md:ml-20 mt-10 md:mt-0">
        <img src="@/assets/images/body_2.png" alt="" />
      </div>
      <div class="items-center mb-5 mx-auto md:ml-20 mt-10 md:mt-0">
        <div class="flex mb-6">
          <img src="@/assets/images/icon_1.png" alt="" class="w-11 h-auto" />
          <div class="ml-5">
            <span class="count_majors text-white">300</span><br />
            <span class="majors text-textColor2">Instructor</span>
          </div>
        </div>

        <div class="flex mb-6">
          <img src="@/assets/images/icon_1.png" alt="" class="w-11 h-auto" />
          <div class="ml-5">
            <span class="count_majors text-white">20,000+</span><br />
            <span class="majors text-textColor2">Student</span>
          </div>
        </div>
        <div class="flex mb-6">
          <img src="@/assets/images/icon_1.png" alt="" class="w-11 h-auto" />
          <div class="ml-5">
            <span class="count_majors text-white">10,000+</span><br />
            <span class="majors text-textColor2">Video</span>
          </div>
        </div>

        <div class="flex mb-6">
          <img src="@/assets/images/icon_1.png" alt="" class="w-11 h-auto" />
          <div class="ml-5">
            <span class="count_majors text-white">1,00,000+</span><br />
            <span class="majors text-textColor2">User’s</span>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-center items-center mx-24 mt-36 mb-40"
      v-if="!isLogin"
    >
      <div class="w-1/2">
        <div class="text-white text-5xl">
          Join our <span class="text-button">world's largest</span> learning
          platform today
        </div>
        <div class="text-textColor2 mt-4">
          Start learning by registering and get 30 days free trail
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="bg-button2 text-white px-5 py-3 rounded-full w-56 justify-center items-center text-center"
        >
          <router-link to="/register-lecturer" class=""
            >Join as Instructor</router-link
          >
        </div>
        <div
          class="mt-10 bg-button text-white px-5 py-3 rounded-full w-56 justify-center items-center text-center"
        >
          <router-link to="/register-student" class=""
            >Join as Student</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourseComponent from "@/components/Items/CourseComponent.vue";
import adminService from "@/services/adminService";
export default {
  name: "HomeView",
  components: {
    CourseComponent,
  },
  data() {
    return {
      courses: [],
      userProfiles: {},
      isLogin: false,
    };
  },
  methods: {
    async getCourse() {
      try {
        const response = await adminService.getAllCourses();
        this.courses = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    checkLogin() {
      if (localStorage.getItem("user")) {
        this.isLogin = true;
      }
    },
  },
  mounted() {
    this.getCourse();
    this.checkLogin();
  },
};
</script>

<style lang="css" scoped>
.container {
  padding-top: 40px;
  width: 92%;
  margin: 0 auto;
}
.block-1 .block-1-1 {
  width: 60%;
}
.block-1 img {
  width: 500px;
}
.search {
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding: 10px 20px;
  border: 1px solid #b0b0d1;
  border-radius: 30px;
  width: 80%;
  background-color: white;
}
.search input {
  border: none;
  margin-left: 10px;
  width: 100%;
}
.icon-search {
  background-color: white;
  color: inherit;
}
.courses {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}
.course {
  margin-right: 40px;
  margin-bottom: 40px;
}
@media (max-width: 1200px) {
  .block-1 .block-1-1 {
    width: 100%;
  }

  .block-1 img {
    width: 100%;
  }

  .search {
    width: 100%;
  }

  .courses {
    grid-template-columns: repeat(2, 1fr);
  }
  .block-1-1_p {
    font-size: 60px;
  }
  .img_block-1 {
    width: 60% !important;
  }
}
@media screen and (max-width: 1024px) {
  .block-1-1_p {
    font-size: 40px;
  }
  .img_block-1 {
    width: 30% !important;
  }
}
@media (max-width: 768px) {
  .courses {
    grid-template-columns: 1fr;
  }
  .block-1-1_p {
    font-size: 40px;
  }
  .img_block-1 {
    display: none;
  }
}
</style>
