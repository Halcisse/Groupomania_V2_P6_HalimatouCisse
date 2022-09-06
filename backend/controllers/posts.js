const Post = require("../models/posts");
const auth = require("../middleware/auth");
const fs = require("fs");

// Pour afficher tous les posts = GET
exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Pour afficher un seul post = GET
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    // affiche le post correspondant à l'id
    _id: req.params.id,
  })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

//Pour créer un post = POST
exports.createPost = (req, res, next) => {
  console.log(req.file);
  if (req.file) {
    const post = new Post({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      usersLiked: [],
      usersDisliked: [],
      likes: 0,
      dislikes: 0,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
          postId: post._id,
          message: "Post publié avec succès!",
        });
      })
      .catch((error) => {
        console.log("reqfile", error);
        res.status(400).json({});
      });
  } else {
    const post = new Post({
      ...req.body,
      imageUrl: null,
      usersLiked: [],
      usersDisliked: [],
      likes: 0,
      dislikes: 0,
    });
    post
      .save()
      .then(() => {
        res.status(201).json({
          postId: post._id,
          message: "Post publié avec succès!",
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({});
      });
  }
};

//Pour modifier un post = PUT
exports.modifyPost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: new Error("Une erreur s'est produite!"),
        });
      }
      if (req.file) {
        // s'il y a un fichier dans les éléments à modifier
        const filename = post.imageUrl.split("/images/")[1]; //on récupère le nom du fichier
        fs.unlink(`images/${filename}`, () => {
          //... on le supprime et on met à jour le post
          const postObject = {
            ...req.body.post,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Post.updateOne(
            { _id: req.params.id },
            { ...postObject, _id: req.params.id }
          )
            .then(() =>
              res.status(200).json({
                message: "Le post a été modifié avec succès!!",
                post,
              })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else if (!req.file) {
        // s'il n'y a pas de fichier dans les changements, on modife simplement
        const postObject = {
          ...req.body.post,
          imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
          }`,
        };
        Post.updateOne(
          { _id: req.params.id },
          { ...postObject, _id: req.params.id }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Le post a été modifié avec succès!!", post })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

//Pour supprimer un post = DELETE
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (!post) {
        res.status(404).json({
          error: new Error("Ce post n'existe pas!"),
        });
      }
      if (req.file) {
        const filename = post.imageUrl.split("/images/")[1]; // on recherche le nom du fichier image et on supprime le fichier
        fs.unlink(`images/${filename}`, () => {
          Post.deleteOne({ _id: req.params.id })
            .then(() =>
              res
                .status(200)
                .json({ message: "Le post a été supprimé avec succès!!", post })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Post.deleteOne({ _id: req.params.id })
          .then(() =>
            res
              .status(200)
              .json({ message: "Le post a été supprimé avec succès!!", post })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

///likes
exports.likePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (
        // si le user like un post pour la première fois
        req.body.like === 1 &&
        !post.usersLiked.includes(req.body.userId) &&
        !post.usersDisliked.includes(req.body.userId)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { likes: 1 },
            $push: { usersLiked: req.body.userId },
          }
        )
          .then(() =>
            res.status(201).json({ message: "Tu as liké cette publication!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // s'il souhaite liker un post qu'il a déja liké
        req.body.like === 0 &&
        post.usersLiked.includes(req.body.userId)
      ) {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Tu as changé d'avis sur cette publication!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // si le user dislike un post pour la première fois
        req.body.like === -1 &&
        !post.usersLiked.includes(req.body.userId) &&
        !post.usersDisliked.includes(req.body.userId)
      ) {
        Post.updateOne(
          { _id: req.params.id },
          {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: req.body.userId },
          }
        )
          .then(() =>
            res
              .status(201)
              .json({ message: "Dommage, tu n'aimes pas cette publication!" })
          )
          .catch((error) => res.status(400).json({ error }));
      } else if (
        // s'il souhaite disliker un post qu'il a déja dislike
        req.body.like === 0 &&
        post.usersDisliked.includes(req.body.userId)
      ) {
        Post.updateOne(
          {
            _id: req.params.id,
          },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() =>
            res
              .status(200)
              .json({ message: "Tu as changé d'avis sur cette publication!" })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    })
    .catch((error) => res.status(400).json({ error }));
};
