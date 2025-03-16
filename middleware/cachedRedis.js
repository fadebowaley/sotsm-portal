const redisClient = require("../config/redisClient");

const getOrSetCache = async (cacheKey, dbQuery, expireTime = 3600) => {
  try {
    // ✅ Use v4 API for Redis in legacyMode
    const cachedData = await redisClient.v4.get(cacheKey);
    if (cachedData) {
      console.log(`✅ Using cached data for ${cacheKey}`);
      return JSON.parse(cachedData);
    }

    console.log(`🔍 No cache found for ${cacheKey}, fetching from DB...`);
    const freshData = await dbQuery();

    if (freshData && freshData.length > 0) {
      await redisClient.v4.set(
        cacheKey,
        JSON.stringify(freshData),
        "EX",
        expireTime
      );
      console.log(`✅ Data cached for ${cacheKey}`);
    } else {
      console.log(`⚠️ No valid data for ${cacheKey}, skipping cache.`);
    }

    return freshData;
  } catch (error) {
    console.error("🚨 Redis Cache Error:", error);
    return dbQuery();
  }
};

module.exports = { getOrSetCache };
