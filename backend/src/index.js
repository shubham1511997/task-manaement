require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const taskRoutes = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());

let baseUri = process.env.CORS_ORIGIN || "http://localhost:4200/";

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser clients (no Origin header) and the exact baseUri
    if (!origin || origin === baseUri) {
      return callback(null, true);
    }
    console.log(
      `❌ CORS blocked request from origin: ${origin} - baseUri: ${baseUri}`
    );
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// Auth routes
app.use("/api/auth", userRoutes);

app.use("/api/tasks", taskRoutes);

// Connect and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to DB");
    app.listen(process.env.PORT || 4000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 4000}`)
    );
  })
  .catch((err) => console.error("❌ DB Connection error:", err));
