const mongoose = require("mongoose");
const { taskManager } = require("../utils/mongo");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports.readUser = taskManager.model("User", userSchema, "User");
module.exports.writeUser = taskManager.model("User", userSchema, "User");
