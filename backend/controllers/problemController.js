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

// @desc    Get problems with filter
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const filter = { user: req.user._id };

    if (req.query.topic) {
      filter.topic = req.query.topic;
    }

    if (req.query.difficulty) {
      filter.difficulty = req.query.difficulty;
    }

    const problems = await Problem.find(filter).sort({
      createdAt: -1,    
    });

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
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
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createProblem, getProblems, updateProblem, deleteProblem };
