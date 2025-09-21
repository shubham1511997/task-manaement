const mongoose = require("mongoose");
require("dotenv").config();

const taskManager = mongoose.createConnection(process.env.MONGO_URI);

taskManager.on("connected", () => console.log("✅ MongoDB Connected"));
taskManager.on("error", (err) => console.error("❌ MongoDB Error:", err));

module.exports = { taskManager };
