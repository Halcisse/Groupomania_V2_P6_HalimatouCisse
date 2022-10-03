import { CreateStore } from "vue";
import Vue from "vue";
import Vuex from "vuex";
import StorePost from "./StorePost.js";

Vue.use(Vuex);
const store = new Vue.CreateStore({
  modules: { StorePost: StorePost },
});
export default store;
