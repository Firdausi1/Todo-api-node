const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, requred: true },
    email: { type: String, requred: true },
    password: { type: String, requred: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
