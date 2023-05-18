import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name:String,
    creator: String,
    tags: [String], //array  of strings.
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema)   // turing schema into model...

export default PostMessage;