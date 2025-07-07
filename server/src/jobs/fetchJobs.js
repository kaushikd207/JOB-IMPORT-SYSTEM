const axios = require("axios");
const xml2js = require("xml2js");
const ImportLog = require("../models/ImportLog");
const jobQueue = require("../queues/jobQueue");

const FEED_URLS = [
  "https://jobicy.com/?feed=job_feed",
  "https://jobicy.com/?feed=job_feed&job_categories=design-multimedia",
  "https://www.higheredjobs.com/rss/articleFeed.cfm",
];

async function fetchJobs() {
  const importLog = await new ImportLog({
    timestamp: new Date(),
    totalFetched: 0,
    newJobs: 0,
    updatedJobs: 0,
    failedJobs: [],
  }).save();

  for (const url of FEED_URLS) {
    const xml = await axios.get(url);
    const json = await xml2js.parseStringPromise(xml.data);
    const items = json.rss.channel[0].item || [];
    importLog.totalFetched += items.length;

    for (const item of items) {
      const jobData = {
        jobId: item.link[0],
        title: item.title[0],
        company: item["job:company"]?.[0] || "",
        location: item["job:location"]?.[0] || "",
        url: item.link[0],
        date: new Date(item.pubDate[0]),
      };
      await jobQueue.add("default", { jobData, logId: importLog._id });
    }
  }
  await importLog.save();
}
module.exports = fetchJobs;
