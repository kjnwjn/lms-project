<template>
  <div class="w-4/5 bg-white mx-auto flex">
    <div class="w-3/5">
      <div class="border rounded-md p-4 w-full mx-auto max-w-2xl">
        <h4 class="text-xl lg:text-2xl font-semibold">
          {{ question.content }}
        </h4>
        <form @submit.prevent="handleSubmitQuiz">
          <div>
            <label
              v-for="(choice, key) in choices"
              :key="key"
              class="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer"
            >
              <input
                type="radio"
                :name="question.id"
                v-model="selectedChoice"
                :value="choice.id"
                :disabled="isQuestionSubmitted(question)"
              />
              <i class="pl-2">{{ choice.choice }}</i>
            </label>
          </div>

          <div>
            <button
              type="submit"
              class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="ml-2">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">Questions</h2>
        <div class="grid grid-cols-3 gap-4 mt-2">
          <div v-for="(question, key) in questions" :key="key">
            <button
              @click="
                !isQuestionSubmitted(question) && handleClickQuestion(question)
              "
              :disabled="isQuestionSubmitted(question)"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              :class="{ 'bg-green-500': isQuestionSubmitted(question) }"
            >
              <span> {{ key + 1 }}</span>
            </button>
          </div>
          <button
            @click="handleFinishQuiz"
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quizService from "@/services/quizzService";
export default {
  name: "ExamComponent",
  data() {
    return {
      courseId: this.$route.params.courseId,
      quizId: this.$route.params.quizId,
      questions: [],
      question: {},
      choices: [],
      submittedQuestions: [],
      selectedChoice: null,
      sittingId: this.$route.query.sitting,
    };
  },
  methods: {
    async getQuestions() {
      try {
        const response = await quizService.getAllQuestionInQuiz(this.quizId);
        this.questions = response.data.data;
        this.question = this.questions[0];
        this.choices = this.question.choices;
      } catch (error) {
        console.log(error);
      }
    },
    handleClickQuestion(question) {
      this.question = question;
      this.choices = question.choices;
      this.selectedChoice = null;
    },
    async handleSubmitQuiz() {
      try {
        if (!this.selectedChoice) {
          this.$toast.error("Please select an answer");
          return;
        }
        if (this.isQuestionSubmitted(this.question)) {
          this.$toast.error("You have already submitted this question");
          return;
        }
        const data = {
          questionId: this.question.id,
          choiceId: this.selectedChoice,
          courseId: this.courseId,
          quizId: this.quizId,
          isMultipleChoice: 1,
        };
        console.log(data);
        const response = await quizService.submitQuizz(this.sittingId, data);
        console.log(response.data.data);
        this.submittedQuestions.push(this.question);
        this.$toast.success("Question submitted successfully");
      } catch (error) {
        console.log(error);
      }
    },
    isQuestionSubmitted(question) {
      return this.submittedQuestions.includes(question);
    },
    async handleFinishQuiz() {
      try {
        if (!this.isAllSubmitted()) {
          this.$toast.error("Please submit all questions");
          return;
        }
        // eslint-disable-next-line no-unused-vars
        const response = await quizService.quizzFinish(
          {
            courseId: this.courseId,
            quizId: this.quizId,
          },
          this.sittingId
        );
        this.$toast.success("Quiz submitted successfully");
        this.$router.push({
          path: `/quiz/result/${this.courseId}/${this.quizId}`,
          query: { sitting: this.sittingId },
        });
      } catch (error) {
        console.log(error);
      }
    },
    isAllSubmitted() {
      return this.submittedQuestions.length === this.questions.length;
    },
  },
  created() {
    this.getQuestions();
  },
};
</script>
