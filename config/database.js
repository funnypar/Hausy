import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
    mongoose.set("strictQuery", true);

    if (connected) {
        console.log("Database is successfully connected ...");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log("Database connected...");
    } catch (err) {
        console.log(err);
    }
};

export default connectDb;
