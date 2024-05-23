import dotenv from "dotenv";
import path from "path";

//Import the config file
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

export const config = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,

  corsURL: process.env.CORS_URL,
  mongoURI: process.env.MONGO_URI,
  minPoolSize: parseInt(process.env.MONGO_MIN_POOL_SIZE || "5"),
  maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || "10"),

  clientURL: process.env.CLIENT_URL,

  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  logDir: process.env.LOG_DIR,

  jwtSecret: process.env.JWT_SECRET,

  tokenExp: process.env.TOKEN_EXPIRY || "1d",
  tokenIss: process.env.TOKEN_ISSUER || "",
  tokenAud: process.env.TOKEN_AUDIENCE || "",
};
