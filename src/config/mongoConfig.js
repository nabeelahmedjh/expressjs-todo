import mongoose from "mongoose";
import "dotenv/config";

const connectionString = process.env.MONGODB_URI;
const maxRetries = 3; // Maximum number of retries
const retryDelay = 1000; // Wait time between retries (in milliseconds)

const DBConnection = async () => {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const connectionInstance = await mongoose.connect(connectionString, {});

      console.log(
        `DB connected successfully! to host ${connectionInstance.connection.host}`
      );

      const db = connectionInstance.connection;
      db.on("error", console.error.bind(console, "mongo connection error"));
      return;
    } catch (error) {
      console.error(
        `Connection attempt ${retries + 1} failed: ${error.message}`
      );
      retries++;
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }
};

export { DBConnection };
