declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      CORS_URL: string;

      MONGO_URI: string;
      MIN_POOL_SIZE: string;
      MAX_POOL_SIZE: string;

      CLIENT_URL: string;

      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;

      LOG_DIR: string;

      JWT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
