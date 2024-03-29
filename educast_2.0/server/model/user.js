import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },

  verifytoken: {
    type: String,
  },

  tutor: {
    type: String,
    default: "",
  },
});

const user = mongoose.model("user", userSchema);

export default user;
