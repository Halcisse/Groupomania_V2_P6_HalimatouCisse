import axios from "./api_services";

let getAllPosts = () => {
  return axios.get("/posts");
};
let getOnePost = (Credendials) => {
  return axios.get("/:id", Credendials);
};
let createPost = (post) => {
  return axios.put("/", post);
};

// let modifyPost = (Credendial) => {
//   return Axios.put("auth/posts/:id", Credendial);
// };
// let deletePost = (Credendial) => {
//   return Axios.delete("auth/posts/:id", Credendial);
//};
export const postsServices = {
  getAllPosts,
  getOnePost,
  createPost,

  // modifyPost,
  // deletePost,
};
