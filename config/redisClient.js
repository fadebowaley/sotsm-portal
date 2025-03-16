const { createClient } = require("redis");

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
  legacyMode: true,
});

redisClient.connect().catch((err) => {
  console.error("Redis connection error:", err);
});

module.exports = redisClient;
