import { Server } from "socket.io";  // ✅ Import the Server class

export const connectToSocket = (server) => {
    const io = new Server(server);
    return io;
};