const mongoose = require("mongoose");

const ImportLogSchemna = new mongoose.Schema({
  timestamp: Date,
  totalFetched: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{ job: Object, reason: String }],
});

module.exports = mongoose.model("ImportLog", ImportLogSchemna);
