import mongoose from "mongoose";

export default async function connect() {
    console.log("starting db connection")
    await mongoose.connect(process.env.ATLAS_URI)
    console.log("db connected")
}