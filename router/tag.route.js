const express = require("express");
const {
  getUserTags,
  updateTag,
  deleteTag,
  createTag,
  getTagTodos,
} = require("../controllers/tag.controller");
const router = express.Router();

router.get("/tasks/:tag_id?", getTagTodos);
router.get("/:user_id?", getUserTags);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
