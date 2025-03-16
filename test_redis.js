const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
  console.log("Connected to Redis...");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

client.connect(); // Ensure you call connect() for Redis v4+
