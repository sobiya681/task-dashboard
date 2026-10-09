require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.json({ status: "API running" }));

// DB connect
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server on http://localhost:${PORT}`),
    );
  })
  .catch((err) => console.error("❌ MongoDB error:", err));
