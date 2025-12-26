import { asyncHandler } from "../utils/asyncHandler";
import { verifyToken } from "../services/tokenGen";
import User from "../models/User";
import { JwtPayload } from "jsonwebtoken";

export const sessionVerify = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies.session;
    if (cookie && cookie.length > 0) {
        const token = verifyToken(cookie);
        const user = await User.findOne({ _id: (token as JwtPayload).id });
        req.username = user!.username;
        req.userid = user!._id;
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
});