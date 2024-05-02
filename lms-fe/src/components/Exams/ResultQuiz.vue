<template>
  <div class="w-4/5 bg-white mx-auto flex">
    <div class="w-3/5">
      <div class="border rounded-md p-4 w-full mx-auto max-w-2xl">
        <h4 class="text-xl lg:text-2xl font-semibold">
          {{ question.content }}
        </h4>

        <div v-for="(choice, key) in choices" :key="key" class="flex">
          <div class="w-11/12">
            <label
              class="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer"
            >
              <input
                type="radio"
                :name="question.id"
                :value="choice.id"
                v-model="selectedChoice"
                disabled
              />

              <i class="pl-2">{{ choice.choice }}</i>
            </label>
          </div>
          <div
            class="flex items-center justify-center ml-4"
            v-if="choice.correct"
          >
            <font-awesome-icon
              :icon="['fas', 'check']"
              class="text-white bg-green-400 rounded-full h-6 px-2 py-2"
            />
          </div>
          <div
            class="flex items-center justify-center ml-4"
            v-if="handleShowResultFail(answerUserHandle, question, choice)"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="text-white bg-red-400 rounded-full h-6 px-2 py-2"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="ml-2">
      <div>
        <h2 class="text-xl font-semibold text-gray-800">Questions</h2>
        <div class="grid grid-cols-3 gap-4 mt-2">
          <div v-for="(question, key) in questions" :key="key">
            <button
              @click="handleClickQuestion(question)"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <span> {{ key + 1 }}</span>
            </button>
          </div>
        </div>
        <div>
          <div class="text-xl text-green-400">
            <span class="text-2xl font-semibold text-black"> Your score: </span>
            <br />
            {{ result.currentScore }} / {{ questions.length }}
          </div>
          <div class="mt-5">
            <router-link :to="`/quiz/${courseId}`">
              <button
                type="button"
                class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Back to quizz
              </button>
            </router-link>
          </div>
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
      selectedChoice: null,
      sittingId: this.$route.query.sitting,
      result: {},
      answerUser: null,
      answerUserHandle: [],
    };
  },
  methods: {
    handleClickQuestion(question) {
      this.question = question;
      this.choices = question.choices;
      this.selectedChoice = null;
    },
    async getResult() {
      try {
        const response = await quizService.getResult(
          this.quizId,
          this.sittingId
        );
        this.result = response.data.data;
        this.questions = this.result.questions;
        this.question = this.questions[0];
        this.choices = this.question.choices;
        this.answerUser = this.result.userAnswers;
        this.handleAnswerUser(this.answerUser);
      } catch (error) {
        console.log(error);
      }
    },
    handleAnswerUser(answerUser) {
      let answer = answerUser.split(";").slice(0, -1);
      let formattedAnswers = answer.map((item) => {
        if (item === "") return;
        let [questionId, choiceId] = item.split(":");
        return { questionId, choiceId };
      });
      this.answerUserHandle = formattedAnswers;
      console.log(this.answerUserHandle);
      return formattedAnswers;
    },
    handleShowResultFail(answerUserHandle, question, choice) {
      let result = answerUserHandle.find(
        (item) =>
          item.questionId === question.id &&
          item.choiceId === choice.id &&
          !choice.correct
      );
      return result;
    },
  },
  created() {
    this.getResult();
  },
};
</script>
