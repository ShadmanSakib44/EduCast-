import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
import axios from "axios";
// const axios = require("axios");

import Token from "../model/token.js";
import User from "../model/user.js";

dotenv.config();

export const singupUser = async (request, response) => {
  if (request.body.googleAccessToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${req.body.googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const name = response.data.given_name;
        const email = response.data.email;

        const existingUser = await User.findOne({ username });

        if (existingUser) {
          return response.status(400).json({ message: "User exists" });
        }

        const result = await User.create({ name: name, username: email });

        const token = jwt.sign(
          {
            email: result.email,
            id: result._id,
          },
          process.env.REFRESH_SECRET_KEY,
          { expiresIn: "4h" }
        );

        response.status(200).json({ result, token });
      })
      .catch((err) => {
        response.status(400).json({ message: "invalid Info" });
      });
  } else {
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
      await newUser.save();

      return response.status(200).json({ msg: "Signup successfull" });
    } catch (error) {
      return response.status(500).json({ msg: "Error while signing up user" });
    }
  }
};

export const loginUser = async (request, response) => {
  if (request.body.googleAccessToken) {
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${req.body.googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const email = response.data.email;

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
          return response.status(400).json({ message: "User does not exists" });
        }

        const token = jwt.sign(
          {
            email: existingUser.email,
            id: existingUser._id,
          },
          process.env.REFRESH_SECRET_KEY,
          { expiresIn: "4h" }
        );

        response.status(200).json({ result: existingUser, token });
      });
  } else {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
      return response.status(400).json({ msg: "Username does not match" });
    }

    try {
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
        });
      } else {
        response.status(400).json({ msg: "Password does not match" });
      }
    } catch (error) {
      response.status(500).json({ msg: "error while login the user" });
    }
  }
};

export const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};
