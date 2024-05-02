<template>
  <!-- component -->

  <section class="py-1 bg-blueGray-50">
    <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
      <div
        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-base text-blueGray-700">Quizes</h3>
            </div>
            <div
              class="relative w-full px-4 max-w-full flex-grow flex-1 text-right"
            >
              <router-link :to="`/quiz/${courseId}`">
                <button
                  class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  BACK TO QUIZ
                </button>
              </router-link>
            </div>
          </div>
        </div>

        <div class="block w-full overflow-x-auto">
          <table class="items-center bg-transparent w-full border-collapse">
            <thead>
              <tr>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Start
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Finish
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                >
                  Score
                </th>
                <th
                  class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                ></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(sitting, key) in quizSittings" :key="key">
                <th
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700"
                >
                  {{ formatTime(sitting.startTime) }}
                </th>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ formatTime(sitting.endTime) }}
                </td>
                <td
                  class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  {{ sitting.currentScore }} / {{ questions.length }}
                </td>
                <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                >
                  <router-link
                    :to="`/quiz/result/${courseId}/${quizId}?sitting=${sitting.id}`"
                    >View Detail</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import quizService from "@/services/quizzService";

export default {
  name: "QuizzResult",
  data() {
    return {
      quizSittings: [],
      courseId: this.$route.params.courseId,
      quizId: this.$route.params.quizId,
      questions: [],
    };
  },
  methods: {
    async getQuizesSitting() {
      try {
        const response = await quizService.getQuizSitting(this.quizId);
        this.quizSittings = response.data.data;
        console.log(this.quizSittings);
      } catch (error) {
        console.log(error);
      }
    },
    async getQuestions() {
      try {
        const response = await quizService.getAllQuestionInQuiz(this.quizId);
        this.questions = response.data.data;
        console.log(this.questions);
      } catch (error) {
        console.log(error);
      }
    },
    formatTime(timeString) {
      if (!timeString) return;
      const date = new Date(timeString);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
      return formattedTime;
    },
  },
  created() {
    this.getQuizesSitting();
    this.getQuestions();
  },
};
</script>
