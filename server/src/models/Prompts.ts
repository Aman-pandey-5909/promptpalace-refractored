import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    authorName: {
        type: String,
        required: true
    },
    title: {
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
    tags: {
        type: [String],
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    image: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    }

}, { timestamps: true });

export default mongoose.model("Prompt", promptSchema);