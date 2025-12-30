import User from "../models/User";

export const checkUser = async (email: string) => {
    const user = User.exists({ email });
    return user;
};

export const checkUsername = async (username: string) => {
    const user = User.exists({ username });
    return user;
}

export const getUserByUsername = async (username: string) => {
    const user = User.findOne({ username });
    return user;
}

export const getUserByID = async (id: string) => {
    const user = User.findById(id);
    return user;
};

export const createUser = async (data: any) => {
    const user = User.create(data);
    return user;
};

export const updateUserByID = async (id: string, data: any) => {
    const user = User.findByIdAndUpdate(id, data, { new: true }).populate("prompts");
    return user;
};

