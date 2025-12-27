const Problem = require("../models/Problem");

// @desc    Create a new problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res) => {
  try {
    const { title, topic, difficulty } = req.body;

    if (!title || !topic || !difficulty) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const problem = await Problem.create({
      title,
      topic,
      difficulty,
      user: req.user._id, // VERY IMPORTANT
    });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Get all problems of logged-in user
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProblem, getProblems };
