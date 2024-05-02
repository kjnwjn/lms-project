import Vue from "vue";
import Vuex from "vuex";
import state from "@src/store/state";
import mutations from "@src/store/mutation";
import actions from "@src/store/action";

Vue.use(Vuex);

export default new Vuex.Store({ state, mutations, actions });
