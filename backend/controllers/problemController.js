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
    throw new Error("Server error");
  }
};

// @desc    Get problems with filter
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const filter = { user: req.user._id };

    if (req.query.topic) {
      filter.topic = req.query.topic;
    }

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    const total = await Problem.countDocuments(filter);

    const problems = await Problem.find(filter)
    .sort({createdAt: -1})
    .skip(skip)
    .limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      problems,
    });
  } catch (error) {
    throw new Error("Server error");
  }
};

// @desc    Update problem status
// @route   PUT /api/problems/:id
// @access  Private
const updateProblem = async (req, res) => {
  try {
    const { status } = req.body;

    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Ownership check
    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    problem.status = status || problem.status;
    const updatedProblem = await problem.save();

    res.status(200).json(updatedProblem);
  } catch (error) {
    throw new Error("Server error");
  }
};


// @desc    Delete a problem
// @route   DELETE /api/problems/:id
// @access  Private
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Ownership check
    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await problem.deleteOne();

    res.status(200).json({ message: "Problem removed" });
  } catch (error) {
    throw new Error("Server error");
  }
};


module.exports = { createProblem, getProblems, updateProblem, deleteProblem };
