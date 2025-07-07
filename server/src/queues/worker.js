const { Worker } = require("bullmq");
const redis = require("../config/redis");
const Job = require("../models/Job");
const ImportLog = require("../models/ImportLog");

const jobWorker = new Worker(
  "jobQueue",
  async (job) => {
    const { jobData, logId } = job.data;

    try {
      const existing = await Job.findOne({ jobId: jobData.jobId });

      if (existing) {
        await Job.updateOne({ jobId: jobData.jobId }, jobData);
        await ImportLog.findByIdAndUpdate(logId, { $inc: { updatedJobs: 1 } });
      } else {
        await new Job(jobData).save();
        await ImportLog.findByIdAndUpdate(logId, { $inc: { newJobs: 1 } });
      }
    } catch (err) {
      console.error("❌ Job failed:", err);
      await ImportLog.findByIdAndUpdate(logId, {
        $push: {
          failedJobs: {
            job: jobData,
            reason: err.message,
          },
        },
      });
    }
  },
  { connection: redis }
);

// Optional: Add logging
jobWorker.on("completed", (job) =>
  console.log(`✅ Job ${job.id} completed successfully`)
);

jobWorker.on("failed", (job, err) =>
  console.log(`❌ Job ${job.id} failed with error: ${err.message}`)
);
