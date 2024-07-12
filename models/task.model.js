const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    tag_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
    tag: { type: String },
    title: { type: String, requred: true },
    content: { type: String, requred: true },
    completed: { type: Boolean },
    hidden: { type: Boolean },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
