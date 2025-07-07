// server/src/config/redis.js
const { Redis } = require('ioredis');

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null, // ✅ required for BullMQ
});

module.exports = redis;
