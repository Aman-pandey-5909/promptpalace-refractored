import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "User",
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    prompts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Prompt",
        default: []
    },
    reputation: {
        type: Number,
        default: 0
    },
    premium: {
        type: Boolean,
        default: false
    },
    premiumUntil: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);