const express = require("express");
const {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
} = require("../controllers/task.controller");
const router = express.Router();

router.get("/:user_id?", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.put("/:id/set-completed", updateTask);
router.put("/:id/set-hidden", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
