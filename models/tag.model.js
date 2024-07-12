const mongoose = require("mongoose");

const TagSchema = mongoose.Schema(
  {
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: { type: String, requred: true },
    color: { type: String, requred: true, default: "#000" },
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: "Task"}]
  },
  { timestamps: true }
);

const Tag = mongoose.model("Tag", TagSchema);
module.exports = Tag;
