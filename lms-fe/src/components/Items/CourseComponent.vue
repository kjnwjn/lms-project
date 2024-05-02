<template>
  <div class="course-item" style="color: white">
    <img
      :src="course.thumbnail ? course.thumbnail : courseDefault"
      alt=""
      class="img-course rounded-t-3xl"
    />

    <h3
      class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-white-900 md:text-3xl lg:text-2xl dark:text-white ml-5"
    >
      {{ course.title }}
    </h3>
    <div class="flex mx-4">
      <div class="flex">
        <img
          :src="userInfor.picture ? userInfor.picture : avaterLecturer"
          alt=""
          class="avatar-lecturers"
        />
        <div class="pl-4">
          <h3 class="name-lecturers text-textColor">
            {{ userInfor.lastName }}
          </h3>
          <span class="lecturer-major text-textColor">Lecturer</span>
        </div>
      </div>
    </div>
    <div class="mx-4 flex">
      <div class="stars">
        <font-awesome-icon :icon="['fas', 'star']" class="star" />
        <font-awesome-icon :icon="['fas', 'star']" class="star" />
        <font-awesome-icon :icon="['fas', 'star']" class="star" />
        <font-awesome-icon :icon="['fas', 'star']" class="star" />
        <font-awesome-icon :icon="['fas', 'star']" class="star" />
      </div>
      <div class="ml-auto">
        <a class="underline decoration-2" :href="`/course/${course.slug}`"
          >Enroll Now</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import courseDefault from "@/assets/images/course-default.jpg";
import userServices from "@/services/userService";
import avaterLecturer from "@/assets/images/avatar-lecturer.png";
export default {
  name: "CourseComponent",
  props: {
    course: Object,
  },

  data() {
    return {
      rating: 5,
      starts: [],
      courseDefault,
      userInfor: {},
      avaterLecturer,
    };
  },
  mounted() {
    try {
      this.stars = this.$el.querySelectorAll(".star");
      this.addStarActiveClass();
    } catch (error) {
      console.error("Error during execution of mounted hook:", error);
    }
    this.getuserbyEmail();
  },
  created() {},
  methods: {
    addStarActiveClass() {
      // Thêm class star-active vào số lượng star tương ứng với rating

      for (let i = 0; i < this.rating; i++) {
        this.stars[i].classList.add("star-active");
      }
    },
    async getuserbyEmail() {
      try {
        const email = this.course.email;
        const response = await userServices.getUserProfile(email);
        this.userInfor = response.data.data;
        console.log(this.userInfor);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="css" scoped>
.course-item {
  width: 400px;
  height: 400px;
  background-color: #381d74 !important;
  border: 3px solid #604a90;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 20px;
}
.img-course {
  width: 100%;
  height: 200px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
.avatar-lecturers {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.course-block-1 {
  display: flex;
  margin: 10px 16px;
}
.btn-play {
  display: flex;
  align-items: center;
}
.btn-play span {
  margin-left: 10px;
}
.star-active {
  color: #f7c600;
}
</style>
