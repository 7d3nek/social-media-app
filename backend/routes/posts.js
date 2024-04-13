const express = require("express");
const { getPosts, createPost, getPost, updatePost, deletePost } = require("../controllers/postController");
const router = express.Router();

// get all posts
router.get("/", getPosts);

// get a single post
router.get("/:id", getPost);

// create new post
router.post("/", createPost);

// update a post
router.patch("/:id", updatePost);

// delete a post
router.delete("/:id", deletePost);


module.exports = router;