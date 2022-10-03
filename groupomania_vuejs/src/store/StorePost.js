import { postsServices } from "@/_services/posts_services";

//  (mutations = {}), (actions = {}), (modules = {});

const getters = {
  displayPost: (state) => state.posts,
};
export default {
  namespaced: true,
  state() {
    return postsServices.getAllPosts();
  },
  getters,
  //   actions,
  //   mutations,
};
