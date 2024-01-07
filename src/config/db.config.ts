import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectionString = process.env.MONGO_URI as string;

const options = {
  // autoIndex: false, // Don't build indexes
  // maxPoolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

export const db = mongoose
  .connect(connectionString, options as ConnectOptions)
  .then((res) => {
    if (res) {
      console.log(`Database connection successfull`);
    }
  })
  .catch((err) => {
    console.log(err);
  });