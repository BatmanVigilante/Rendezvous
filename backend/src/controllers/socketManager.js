import { Server } from "socket.io";  // ✅ Import the Server class

export const connectToSocket = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        socket.on("message", (message) => {
            console.log(message);
        });   
    });

    return io;
};