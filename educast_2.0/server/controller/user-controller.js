import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import Token from "../model/token.js";
import User from "../model/user.js";
import verifyEmail from "../utils/sendEmail.js";
import forgotEmail from "../utils/ForgotEmail.js";
import { set } from "mongoose";

dotenv.config();

export const singupUser = async (request, response) => {
  try {
    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(request.body.password, salt);
    const hashedPassword = await bcrypt.hash(request.body.password, 10);

    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);

    const emailToken = jwt.sign(
      {
        username: request.body.username,
      },
      process.env.VERIFY_SECRET_KEY,
      { expiresIn: "1h" }
    );

    verifyEmail(request.body.username, emailToken);

    await newUser.save();

    return response.status(200).json({ msg: "Signup successfull" });
  } catch (error) {
    return response.status(500).json({ msg: "Error while signing up user" });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username does not match" });
  }

  try {
    if (user.verified == false) {
      return response.status(401).json({ status: 401, msg: "Not verified" });
    }
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );

      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
        user,
      });
    } else {
      response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    response.status(500).json({ msg: "error while login the user" });
  }
};

export const logoutUser = async (request, response) => {
  localStorage.removeItem("userItem");
  console.log("Local Storage removed");
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};

export const verifyUser = async (request, response) => {
  try {
    console.log(request.body.email);
    const dummy = await User.findOneAndUpdate(
      { username: request.body.email },
      { $set: { verified: true } },
      { new: true }
    );
    console.log("User", dummy);
    return response.json({ status: "okay" });
  } catch (error) {
    console.log(error);
    return response.json({ status: "error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter your email" });
  }

  try {
    const userFind = await User.findOne({ username: email });

    const token = jwt.sign(
      { _id: userFind._id },
      process.env.VERIFY_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const setUserToken = await User.findByIdAndUpdate(
      { _id: userFind._id },
      { verifytoken: token },
      { new: true }
    );

    if (setUserToken) {
      forgotEmail(email, userFind._id, setUserToken.verifytoken);
      res.status(201).json({ status: 201, message: "Email sent" });
      console.log("Email sent for reset link");
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.log(error);
  }
};

export const verifyForgotPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validUser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.VERIFY_SECRET_KEY);

    if (validUser && verifyToken._id) {
      res.status(201).json({ status: 201, validUser });
    } else {
      res.status(401).json({ status: 401, message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.log(error);
  }
};

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  console.log(id);

  try {
    const validUser = await User.findOne({ _id: id, verifytoken: token });

    const verifyToken = jwt.verify(token, process.env.VERIFY_SECRET_KEY);

    if (validUser && verifyToken._id) {
      const newpassword = await bcrypt.hash(password, 10);

      const setNewPassword = await User.findByIdAndUpdate(
        { _id: id },
        { password: newpassword }
      );

      setNewPassword.save();

      console.log(setNewPassword);

      res.status(201).json({ status: 201, setNewPassword });
    } else {
      res.status(401).json({ status: 401, message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.log(error);
  }
};

export const tutorRequest = async (req, res) => {
  const id = req.params.id;

  console.log(id);

  try {
    const validUser = await User.findOne({ _id: id });

    if (validUser) {
      const tutorRequest = await User.findOneAndUpdate(
        { _id: id },
        { tutor: "Pending" }
      );

      tutorRequest.save();

      console.log(tutorRequest);

      res.status(201).json({ status: 201 });
    } else {
      res.status(401).json({ status: 401, message: "User not found" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
    console.log(error);
  }
};
