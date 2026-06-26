const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
console.log("MONGO_URI =", process.env.MONGO_URI);
const app = express();
app.use(cors());
// Middleware
app.use(express.json());

// Routes
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
const userRoutes = require("./routes/userRoutes");

app.use("/api/users", userRoutes);