import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Commenting on connecting to MongoDB to test the bankless server
    // const conn = await mongoose.connect(process.env.MONGO_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    console.log("MongoDB connection skipped for now.");

    // Instead of connecting to the bank, it just prints that the connection was ignored
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// export default connectDB;
export default () => {}; //Just an empty function so it doesn't break execution
