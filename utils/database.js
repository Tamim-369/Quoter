import mongoose from "mongoose";
let isConnected = false;

export const connecToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected ");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quoter",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("mongodb connected ");
  } catch (error) {}
};
