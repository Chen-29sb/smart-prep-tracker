const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");



dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running fine 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




