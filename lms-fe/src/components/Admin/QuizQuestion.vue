<template>
  <div class="w-full t rounded-lg">
    <div class="">
      <h1 class="text-2xl font-bold ext-gray-500 dark:text-gray-400">
        Program Name:{{ courseInfor.content }}
      </h1>
      <h1 class="text-xl my-4 ext-gray-500 dark:text-gray-400">
        Summary: {{ courseInfor.summary }}
      </h1>
    </div>
    <div class="my-5">
      <button
        class="text-white p-2 rounded-md px-5 py-3"
        :class="isQuizQuestionForm ? 'bg-button2' : 'bg-button'"
        @click="() => (isQuizQuestionForm = !isQuizQuestionForm)"
      >
        Add New Quiz Question
      </button>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">stt</th>
            <th scope="col" class="px-6 py-3">content</th>
            <th scope="col" class="px-6 py-3">explanation</th>
            <th scope="col" class="px-6 py-3">updatedAt</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="(quizQuestion, key) in listQuizQuestion"
            :key="key"
            @click="showQuestionChoice(key)"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ key + 1 }}
            </th>
            <td class="px-6 py-4">{{ quizQuestion.content }}</td>
            <td class="px-6 py-4">
              {{ quizQuestion.explanation }}
            </td>
            <td class="px-6 py-4">
              {{ quizQuestion.updatedAt }}
            </td>
            <td class="flex items-center px-6 py-4">
              <router-link
                :to="`/admin/course/video/upload/${courseId}/${quizQuestion.id}`"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >Edit</router-link
              >
              <p
                class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                @click="removeQuizQuestion(quizQuestion.id)"
              >
                Remove
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <form
      class="bg-white rounded mt-5"
      v-if="isQuizQuestionForm"
      @submit.prevent="CreateNewQuizQuestion"
    >
      <div class="space-y-12 p-5">
        <div class="border-b border-gray-900/10 pb-3">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            New Quiz Question
          </h2>
          <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label
                for="content"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Content</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <input
                    v-model="content"
                    name="content"
                    id="content"
                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div class="col-span-full">
              <label
                for="explanation"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Explanation</label
              >
              <div class="mt-2">
                <textarea
                  v-model="explanation"
                  id="explanation"
                  name="explanation"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your quiz.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900"
          @click="() => (isQuizQuestionForm = !isQuizQuestionForm)"
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
    <div class="grid grid-cols-2 gap-4">
      <div
        v-if="questionSelected"
        class="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg"
      >
        <h3 class="font-bold text-white text-xl">Question Choice</h3>
        <table
          v-if="questionSelected?.choices.length > 0"
          class="w-full mt-3 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-6 py-3">stt</th>
              <th scope="col" class="px-6 py-3">content</th>
              <th scope="col" class="px-6 py-3">correct</th>
              <th scope="col" class="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              v-for="(choice, key) in questionSelected?.choices"
              :key="key"
            >
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {{ key + 1 }}
              </th>
              <td class="px-6 py-4">{{ choice?.choice }}</td>
              <td class="px-6 py-4">
                {{ choice?.correct }}
              </td>

              <td class="flex items-center px-6 py-4">
                <router-link
                  :to="`/admin/course/video/upload/${courseId}/${choice.id}`"
                  class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >Edit</router-link
                >
                <p
                  class="font-medium text-red-600 dark:text-red-500 hover:underline ms-3 cursor-pointer"
                  @click="RemoveQuizQuestionChoice(choice.id)"
                >
                  Remove
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-white">Quiz question choice empty</p>
      </div>
      <div class="mt-5">
        <form
          v-if="questionSelected"
          @submit.prevent="CreateNewQuizQuestionChoice"
          class="bg-white rounded mt-12"
        >
          <div class="space-y-12 p-5">
            <div class="border-b border-gray-900/10 pb-3">
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                New Quiz Question Choice
              </h2>
              <div class="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label
                    for="choice"
                    class="block text-sm font-medium leading-6 text-gray-900"
                    >choice</label
                  >
                  <div class="mt-2">
                    <div
                      class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                    >
                      <input
                        v-model="choice"
                        name="choice"
                        id="choice"
                        class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-10 space-y-10">
                <fieldset>
                  <div class="space-y-6">
                    <div class="relative flex gap-x-3">
                      <div class="flex h-6 items-center">
                        <input
                          id="correct"
                          name="correct"
                          type="checkbox"
                          v-model="correct"
                          class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                      <div class="text-sm leading-6">
                        <label for="correct" class="font-medium text-gray-900"
                          >Correct</label
                        >
                        <p class="text-gray-500">
                          Check if this choice is correct
                        </p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import adminService from "@/services/adminService";
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
      quizId: this.$route.params.quizId,
      listQuizQuestion: [],
      courseInfor: {},
      content: "",
      explanation: "",
      multipleChoice: true,
      isQuizQuestionForm: false,
      questionSelected: null,
      isQuizChoiceForm: false,
      choice: "",
      correct: false,
    };
  },
  methods: {
    async getCourseByCourseId() {
      try {
        const response = await adminService.getCourseById(this.courseId);
        this.courseInfor = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async GetListQuizQuestion() {
      try {
        const response = await adminService.getListQuizQuestionByAdmin(
          this.quizId
        );
        this.listQuizQuestion = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async CreateNewQuizQuestion() {
      try {
        await adminService.createNewQuizQuestion(this.quizId, {
          content: this.content,
          explanation: this.explanation,
          multipleChoice: this.multipleChoice,
        });
        this.GetListQuizQuestion();
        this.isQuizQuestionForm = false;
        this.$toast.success("Create new quiz question success");
      } catch (error) {
        console.log(error);
      }
    },
    async removeQuizQuestion(id) {
      try {
        await adminService.removeQuizQuestion(id);
        this.GetListQuizQuestion();
        this.questionSelected = null;
        this.$toast.success("Remove quiz question for question success");
      } catch (error) {
        this.$toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
    showQuestionChoice(index) {
      this.questionSelected = this.listQuizQuestion[index];
    },
    async CreateNewQuizQuestionChoice() {
      try {
        await adminService.createNewQuizQuestionChoice(
          Number(this.questionSelected.id),
          {
            choice: this.choice,
            correct: this.correct,
          }
        );
        this.$toast.success("Create new quiz choice for question success");
        this.questionSelected = null;
        this.choice = "";
        this.correct = false;
        this.isQuizQuestionForm = false;
        this.GetListQuizQuestion();
      } catch (error) {
        this.$toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
    async RemoveQuizQuestionChoice(id) {
      try {
        await adminService.removeQuizQuestionChoice(id);
        this.GetListQuizQuestion();
        this.questionSelected = null;
        this.$toast.success("Remove quiz choice for question success");
      } catch (error) {
        this.$toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCourseByCourseId();
    this.GetListQuizQuestion();
  },
};
</script>
