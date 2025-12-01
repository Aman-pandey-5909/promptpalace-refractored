import Comment from "../models/Comment";

export const createComment = async (data: any) => {
    const comment = Comment.create(data);
    return comment;
};

export const getComments = async (id: string) => {
    const comments = Comment.find({ commentOn: id });
    return comments;
};

export const updateComment = async (id: string, data: any) => {
    const comment = Comment.findByIdAndUpdate(id, data, { new: true });
    return comment;
};

export const deleteComment = async(id: string) => {
    const comment = Comment.findByIdAndDelete(id);
    return comment;
}