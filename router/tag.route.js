const express = require("express");
const {
  getTags,
  getTag,
  updateTag,
  deleteTag,
  createTag,
} = require("../controllers/tag.controller");
const router = express.Router();

router.get("/?user_id", getTags);
router.get("/:id", getTag);
router.post("/", createTag);
router.put("/:id", updateTag);
router.delete("/:id", deleteTag);

module.exports = router;
