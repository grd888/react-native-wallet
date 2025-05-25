import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // in the key, we can use the ip address or the user id
    const { success} = await ratelimit.limit(
      "my-rate-limit"
    );
    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }
    next();
  } catch (error) {
    console.log("Error rate limiting:", error);
    next(error);
  }
}

export default rateLimiter;
