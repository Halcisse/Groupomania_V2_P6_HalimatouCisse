import Axios from "./caller_services";

// async function getAllPosts(token) {
//   let posts = await fetch("http://localhost:3000/api/posts", token, {
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//   });
//   return posts;
// } 403

let getAllPosts = () => {
  return Axios.get("/");
};
let getOnePost = (Credendials) => {
  return Axios.get("/:id", Credendials);
};
let createPost = (Credendials) => {
  return Axios.post("/", Credendials);
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
