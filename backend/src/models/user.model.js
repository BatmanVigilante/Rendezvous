import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
});

export default mongoose.model("User", userSchema);