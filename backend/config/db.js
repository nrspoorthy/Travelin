import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "data is connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectdb;
