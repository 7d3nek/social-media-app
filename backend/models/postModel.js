const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: false,
        default: null
    },
    imageUrl: {
        type: String,
        required: false,
        default: null
    },
    edited: {
        type: Boolean,
        required: false,
        default: false
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    dislikes: {
        type: Number,
        required: true,
        default: 0,
    }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);