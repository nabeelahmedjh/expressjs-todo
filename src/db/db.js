import mongoose from "mongoose";
import "dotenv/config";

const DBConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `DB connected successfully! to host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

export { DBConnection };
