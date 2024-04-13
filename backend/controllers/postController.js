const mongoose = require("mongoose");
const Post = require("../models/postModel");

// get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
}

// get a single post
const getPost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: "Post does not exist!" });
    }
    try {
        const post = await Post.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// create new post
const createPost = async (req, res) => {
    try {
        await Post.create({ ...req.body });
        res.status(200).json({ msg: "Post created." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// delete a post
const deletePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: "Post does not exist!" });
    }
    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({ msg: "Post deleted." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

// update a post
const updatePost = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ msg: "Post does not exist!" });
    }
    try {
        await Post.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ msg: "Post updated." });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}