const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, // required for upsert logic
  title: String,
  company: String,
  location: String,
  url: String,
  date: Date,
});

module.exports = mongoose.model("Job", JobSchema);
