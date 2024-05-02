<template>
  <div>
    <div class="container mx-auto w-4/5 my-4">
      <div class="grid grid-cols-3 gap-4">
        <CourseComponent
          v-for="course in courses"
          :key="course.id"
          :course="course"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CourseComponent from "@/components/Items/CourseComponent.vue";
import userService from "@/services/userService";
export default {
  components: {
    CourseComponent,
  },
  data() {
    return {
      courses: [],
      userInfor: null,
    };
  },
  methods: {
    async getListCourseByUserId() {
      try {
        const response = await userService.getCourseByUserId(this.userInfor.id);
        this.courses = response.data.data;
        console.log(this.courses);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.userInfor = this.$store.getters["getUserInfo"];
    this.getListCourseByUserId();
  },
};
</script>
