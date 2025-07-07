require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cron = require("node-cron");
const fetchJobs = require("./jobs/fetchJobs");
const ImportLog = require("./models/ImportLog");
require("./queues/worker");

const app = express();
connectDB();

app.get("/api/logs", async (req, res) => {
  const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(20);
  res.json(logs);
});

cron.schedule("0 * * * *", fetchJobs); // Every hour

app.listen(5000, () => console.log("Server on port 5000"));
