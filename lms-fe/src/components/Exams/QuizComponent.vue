<template>
  <div
    class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-5 mb-5"
  >
    <div class="bg-gray-100 py-2 px-4">
      <h2 class="text-xl font-semibold text-gray-800">Quizes</h2>
    </div>
    <ul class="divide-y divide-gray-200">
      <li
        class="flex items-center py-4 px-6"
        v-for="(quiz, key) in quizes"
        :key="key"
      >
        <span class="text-gray-700 text-lg font-medium mr-4"
          >{{ key + 1 }}.</span
        >

        <div class="flex-1">
          <h3 class="text-lg font-medium text-gray-800">{{ quiz.title }}</h3>
        </div>

        <button
          @click="handleStartQuiz(courseId, quiz.id)"
          type="button"
          class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Practice
        </button>
        <router-link :to="`/quiz/result-sitting/${courseId}/${quiz.id}`">
          Result
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import quizService from "@/services/quizzService";
export default {
  name: "QuizComponent",
  data() {
    return {
      quizes: [],
      courseId: this.$route.params.courseId,
      sittingQuiz: {},
    };
  },
  methods: {
    async getQuizes() {
      try {
        const response = await quizService.getQuizByCourseId(this.courseId);
        this.quizes = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleStartQuiz(courseId, quizId) {
      try {
        const response = await quizService.createQuizSitting(courseId, quizId);
        this.sittingQuiz = response.data.data;
        this.$router.push({
          path: `/quiz/practice/${courseId}/${quizId}`,
          query: { sitting: this.sittingQuiz.id },
        });
      } catch (error) {
        console.log(error);
        this.$toast.error("You have already taken this quiz");
      }
    },
  },
  created() {
    this.getQuizes();
  },
};
</script>
