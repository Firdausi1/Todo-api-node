const Tag = require("../models/tag.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const getTasks = async (req, res) => {
  try {
    const { user_id } = req.query;
    const user = await User.findById(user_id).populate("tasks");
    if (!user) {
      return res.status(401).json({ message: "Invalid user id" });
    }
    res.status(200).json(user.tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const createTask = async (req, res) => {
  try {
    const { tag_id, title, content } = req.body;
    // const id = req.session.token;
    const tag = await Tag.findById(tag_id);

    if (!tag) {
      return res.status(401).json({ message: "Tag doesn't exists" });
    }
    const task = await Task.create({
      tag_id,
      tag: tag.title,
      title,
      content,
      user_id: tag.user_id,
    });
    await Tag.findByIdAndUpdate(tag_id, {
      $push: { tasks: task._id },
    });
    const updateUser = await User.findByIdAndUpdate(tag.user_id, {
      $push: { tasks: task._id },
    });
    if (!updateUser) {
      return res.status(401).json({ message: "couldn't add task" });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(401).json({ message: "Task doesn't exists" });
    }
    const updateTask = await Task.findByIdAndUpdate(id, req.body);
    res
      .status(200)
      .json({ message: "Task updated successfully", data: updateTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    const taskTag = await Tag.findById(task.tag_id.toString(), "tasks").exec();
    const userTask = await User.findById(
      task.user_id.toString(),
      "tasks"
    ).exec();

    const newTaskTag = taskTag.tasks.filter((i) => i.toString() !== id);
    const newUserTask = userTask.tasks.filter((i) => i.toString() !== id);
    await Tag.findByIdAndUpdate(task.tag_id.toString(), { tasks: newTaskTag });
    await User.findByIdAndUpdate(task.user_id.toString(), {
      tasks: newUserTask,
    });

    if (!task) {
      return res.status(401).json({ message: "Task doesn't exists" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createTask, updateTask, getTasks, deleteTask };
