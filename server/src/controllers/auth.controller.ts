import { asyncHandler } from "../utils/asyncHandler";
import {
  checkUser,
  createUser,
  checkUsername,
  getUserByUsername,
  updateUserByID,
} from "../services/auth.service";
import { generateToken, verifyToken } from "../services/tokenGen";
import User from "../models/User";
import { sendMail } from "../services/mailer";
import crypto from "crypto";

export const registerController = asyncHandler(async (req, res) => {
  const { username, email } = req.body; // username and email

  const userExists = await checkUser(email); // check if user exists
  const userNameExists = await checkUsername(username); // check if username exists
  if (userExists || userNameExists) {
    return res.status(400).json({ message: "user already exists" });
  }

  await createUser({ username, email }); // create user
  return res.status(201).json({
    message: "User created Successfully, Please Login to continue",
  });
});

export const loginController = asyncHandler(async (req, res) => {
  const { email, username } = req.body; // username OR email (any one is recieved)

  let useremail; // init useremail

  // if email is provided, set useremail to email
  if (email) {
    const user = await checkUser(email);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    useremail = email;
  }

  // if username is provided, get email from username and set useremail
  if (username) {
    const user = await checkUsername(username);
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const userEmail = await getUserByUsername(username);
    useremail = userEmail!.email;
  }

  const token = generateToken(useremail, "5m"); // generate token
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  await User.findOneAndUpdate({ email: useremail }, { token: hashToken }); // update token in db (temporary)

  await sendMail(
    useremail,
    "Verify your email",
    `http://localhost:3000/auth/verify/${token}`
  ); // send email

  return res
    .status(200)
    .json({ message: "Email sent successfully, please verify to continue" });
});

export const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.params; // token from url (/verify/token)

  if (!token) {
    return res.status(400).json({ message: "Token not provided" });
  }

  try {
    verifyToken(token); // verify token
  } catch (error) {
    await User.findOneAndUpdate({ token }, { token: "" });
    return res.status(400).json({ message: "Invalid token" });
  }

  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({ token: hashToken }); // find user using token
  if (!user) {
    return res.status(400).json({ message: "Invalid token" });
  }
  const userid = user._id.toString(); // get user id
  await updateUserByID(userid, { token: "" }); // update token
  await updateUserByID(userid, { isVerified: true }); // update isVerified

  const cookieToken = generateToken(userid, "15d"); // generate cookie token
  res.cookie("session", cookieToken, { maxAge: 1000 * 60 * 60 * 24 * 15, httpOnly: true, sameSite:"strict", secure: true }); // set cookie
  const returnData = {
    username: user.username,
    email: user.email,
    role: user.role,
    posts: user.posts,
    reputation: user.reputation,
    premiumUntil: user.premiumUntil,
    createdAt: user.createdAt
  }
  return res.status(200).json({ message: "Email verified successfully", user: returnData });
});

export const logoutController = asyncHandler(async (req, res) => {
  res.clearCookie("session"); // clear cookie
  return res.status(200).json({ message: "Logout successful" });
});

export const getuserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userid);
  return res.status(200).json({ message: "User fetched successfully", user: {
    username: user!.username,
    email: user!.email,
    role: user!.role,
    posts: user!.posts,
    reputation: user!.reputation,
    premiumUntil: user!.premiumUntil,
    createdAt: user!.createdAt
  } });
});


export const getOtherUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json({ message: "User fetched successfully", user: {
    username: user!.username,
    email: user!.email,
    role: user!.role,
    posts: user!.posts,
    reputation: user!.reputation,
    premiumUntil: user!.premiumUntil,
    createdAt: user!.createdAt
  } });
});
