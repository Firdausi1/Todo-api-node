const Tag = require("../models/tag.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const getUserTags = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await User.findById(user_id).populate("tags");
    if(!user){
      return res.status(401).json({message: "Invalid user id"})
    }
    res
      .status(200)
      .json(user.tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTagTodos = async (req, res) => {
  try {
    const {tag_id} = req.query;
    const tag = await Tag.findById(tag_id).populate("tasks");
    if(!tag){
      return res.status(401).json({message: "Tag doesn't exists"})
    }
    res
      .status(200)
      .json({ message: "all tasks retrieved successfully", tasks: tag.tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createTag = async (req, res) => {
  try {
    const { user_id } = req.body;
    const tag = await Tag.create(req.body);
    if (tag) {
      const userTag = await User.findByIdAndUpdate(user_id, {
        $push: { tags: tag._id },
      });
      res.status(200).json(userTag);
    } else {
      res.status(401).json({ message: "couldn't create tag" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndUpdate(id, req.body);
    if (!tag) {
      return res.status(401).json({ message: "Tag doesn't exists" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await Tag.findByIdAndDelete(id);
    if (!tag) {
      return res.status(401).json({ message: "Tag doesn't exists" });
    }
    let taskIds = tag.tasks.map((t) => t._id);

    await Task.deleteMany({
      _id: {
        $in: taskIds,
      },
    });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUserTags, getTagTodos, createTag, updateTag, deleteTag };
