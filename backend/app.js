import express from "express";
import { createServer } from "http";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// ✅ Fixed: Using `/users`
app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
    res.json({ message: "Started the server" });
});

// ✅ MongoDB Connection
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
        server.listen(process.env.PORT, () => {
            console.log(`Listening on ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
};

start();