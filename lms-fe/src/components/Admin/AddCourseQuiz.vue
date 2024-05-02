<template>
  <form class="bg-white rounded" @submit.prevent="handlerSubmitQuiz">
    <div class="space-y-12 p-5">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          New Quiz
        </h2>
        <!-- <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p> -->

        <div class="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label
              for="courseId"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Course ID</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="courseId"
                  id="courseId"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  :value="courseId"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="title"
                  id="title"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="title"
                />
              </div>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="questionToPass"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Question to pass</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="questionToPass"
                  id="questionToPass"
                  type="number"
                  min="0"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="questionToPass"
                />
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                The number of question to pass the exam.
              </p>
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="minQuestion"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Min Question</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="minQuestion"
                  id="minQuestion"
                  type="number"
                  min="1"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="minQuestion"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >description</label
            >
            <div class="mt-2">
              <textarea
                id="description"
                name="description"
                rows="3"
                v-model="description"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about your quiz.
            </p>
          </div>
          <div class="sm:col-span-4">
            <label
              for="deadline"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Deadline</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
              >
                <input
                  name="deadline"
                  id="deadline"
                  type="datetime-local"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  v-model="deadline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10 space-y-10">
        <fieldset>
          <legend class="text-sm font-semibold leading-6 text-gray-900">
            Additional data
          </legend>
          <div class="mt-6 space-y-6">
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input
                  id="randomOrder"
                  name="randomOrder"
                  type="checkbox"
                  v-model="randomOrder"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div class="text-sm leading-6">
                <label for="randomOrder" class="font-medium text-gray-900"
                  >Random order</label
                >
                <p class="text-gray-500">Suffles the order of the questions.</p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input
                  id="answersAtEnd"
                  name="answersAtEnd"
                  v-model="answersAtEnd"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div class="text-sm leading-6">
                <label for="answersAtEnd" class="font-medium text-gray-900"
                  >Answers at end</label
                >
                <p class="text-gray-500">
                  Show the correct answers when the quiz is finished.
                </p>
              </div>
            </div>
            <div class="relative flex gap-x-3">
              <div class="flex h-6 items-center">
                <input
                  id="singleAttempt"
                  name="singleAttempt"
                  v-model="singleAttempt"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
              <div class="text-sm leading-6">
                <label for="singleAttempt" class="font-medium text-gray-900"
                  >singleAttempt</label
                >
                <p class="text-gray-500">
                  The candidate can only take the quiz once.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-center gap-x-6">
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      title: "",
      description: "",
      questionToPass: null,
      deadline: null,
      randomOrder: false,
      answersAtEnd: false,
      singleAttempt: false,
      minQuestion: null,
    };
  },
  methods: {
    async handlerSubmitQuiz() {
      try {
        // eslint-disable-next-line no-unused-vars
        console.log(this.courseId);
        console.log(this.title);
        console.log(this.description);
        console.log(this.questionToPass);
        console.log(this.deadline);
        console.log(this.randomOrder);
        console.log(this.answersAtEnd);
        console.log(this.singleAttempt);
        console.log(this.minQuestion);
        await adminService.createNewQuiz({
          courseId: this.courseId,
          title: this.title,
          description: this.description,
          questionToPass: this.questionToPass,
          deadline: this.deadline,
          randomOrder: this.randomOrder,
          answersAtEnd: this.answersAtEnd,
          singleAttempt: this.singleAttempt,
          minQuestion: this.minQuestion,
        });
        this.$router.push("/admin/courses");
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
    },
  },
};
</script>
