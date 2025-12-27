const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
} = require("../controllers/problemController");

const router = express.Router();

router.route("/")
  .post(protect, createProblem)
  .get(protect, getProblems);

router.route("/:id")
  .put(protect, updateProblem)
  .delete(protect, deleteProblem);

module.exports = router;
