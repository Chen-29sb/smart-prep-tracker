const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const path = require("path");




dotenv.config();
connectDB();

const app = express();

app.use(cors());


// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/problems", require("./routes/problemRoutes"));



app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running fine 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error Middleware (must be last)
app.use(errorHandler);
