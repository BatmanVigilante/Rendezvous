import express from "express";
import { createServer } from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./src/controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io =connectToSocket(server);

app.set("port",(process.env.PORT||3000));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}))

app.get("/home",(req,res)=>{
    res.json({
        "Message":"Started the server"
    })
})

const start = async()=>{
    const connectionDB = await mongoose.connect("mongodb+srv://ashishmohan625:X5uDL_BFA4yX3!q@cluster0.qqdbp01.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log(connectionDB.connection.host);
   server.listen(app.get("port"), () => {
        console.log("Listening on 3000");
    });
};

start();
