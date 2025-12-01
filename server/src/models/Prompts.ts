import mongoose from "mongoose";
import { validate } from "../middleware/validate";

const promptSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: {
        type: String,
        required: true,
        default: "Anonymous" // Remove ts after implementing validation middleware
    },
    title: {
        type: String,
        required: true
    },
    titleMasked: {
        type: String,
        required: true
    },
    prompt: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    descriptionMasked: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    image: {
        type: [String],
        default: []
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
        default: []
    }

}, { timestamps: true });

export default mongoose.model("Prompt", promptSchema);