const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createProblem,
  getProblems,
} = require("../controllers/problemController");

const router = express.Router();

router.route("/")
  .post(protect, createProblem)
  .get(protect, getProblems);

module.exports = router;
