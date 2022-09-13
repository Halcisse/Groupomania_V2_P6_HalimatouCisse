<template>
  <div class="creation_post">
    <form @submit.prevent="createPost" method="post">
      <div class="form-group">
        <textarea
          v-model="post.message"
          name="form-control"
          class="form-control"
          placeholder="Quoi de neuf?"
        ></textarea>
        <div class="post_info">
          <div class="file_item">
            <label for="file" class="label_file">
              <p>Ajouter une image?</p>
              <input type="file" @change="uploadImg" accept="image/*" />
              <img :src="post.imageUrl" />
            </label>
          </div>
          <div class="submit">
            <button class="submit_btn" type="submit" name="submit">
              Publier
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "createPost",
  data() {
    return {
      post: {
        message: "",
        imageUrl: null,
        userId: sessionStorage.getItem("id"),
        postId: "",
      },
      file: null,
      posts: [],
    };
  },

  methods: {
    uploadImg(event) {
      let file = event.target.files[0];
      this.file = file;
    },

    createPost() {
      //s'il n'y a pas de message et pas de fichiers
      if (this.post.message == "" && this.file == null) {
        alert("La publication est vide!");
      }
      //s'il y a des fichiers et/ou message
      if (
        (this.post.message != "" && this.file == null) ||
        (this.file != null && this.post.message == "") ||
        (this.file != null && this.post.message != "")
      ) {
        let fd = new FormData();
        fd.append("file", this.file);
        fd.append("message", this.post.message);
        fd.append("postId", this.post.postId);

        let token = sessionStorage.getItem("token");
        fetch("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
          method: "POST",

          body: fd,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            // this.post.imageUrl = data.imageUrl;
            // this.post.postId = data.postId;
            // this.posts.push(this.post);
            // this.$router.push("/forum");
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style scoped>
textarea {
  height: 125px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 12px;
  font-family: "Lato", sans-serif;
}
</style>
