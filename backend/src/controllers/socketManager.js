import { Server } from "socket.io";  // ✅ Import the Server class

let connections = {};  // Stores room-to-socket mappings
let timeOnline = {};   // Tracks when each socket connected
let messages = {};     // Stores chat messages per room

export const connectToSocket = (server) => {
    const io = new Server(server,
        {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                allowedHeaders:["*"],
                credentials: true
            }}
    );

    io.on("connection", (socket) => {

        // ✅ Handle when a user joins a call
        socket.on("join-call", (path) => {
            if (!connections[path]) {
                connections[path] = [];
            }
            connections[path].push(socket.id);
            timeOnline[socket.id] = new Date();

            // ✅ Notify all users in the room
            connections[path].forEach(element => {
                io.to(element).emit("user-joined", socket.id);
            });

            // ✅ If there are past messages in this room, send them to the new user
            if (messages[path]) {
                messages[path].forEach(element => {
                    io.to(socket.id).emit("chat-message", element['data'], element['sender'], element['socket-id-sender']);
                });
            }
        });

        // ✅ Handle WebRTC signaling messages
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        });

        // ✅ Handle chat messages
        socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections).find(([room, sockets]) => sockets.includes(socket.id)) || [];

            if (!found) return;

            // ✅ Broadcast message to everyone in the room
            connections[matchingRoom].forEach(element => {
                io.to(element).emit("chat-message", data, sender, socket.id);
            });

            // ✅ Store the message in memory
            if (!messages[matchingRoom]) {
                messages[matchingRoom] = [];
            }
            messages[matchingRoom].push({ data, sender, "socket-id-sender": socket.id });
        });

        // ✅ Handle user disconnection
        socket.on("disconnect", () => {
            const connectedTime = timeOnline[socket.id] || new Date();
            const timeSpent = Math.abs(connectedTime - new Date());

            let roomToRemoveFrom = null;

            // ✅ Find which room the disconnected socket was in
            for (const [room, sockets] of Object.entries(connections)) {
                if (sockets.includes(socket.id)) {
                    roomToRemoveFrom = room;
                    break;
                }
            }

            if (roomToRemoveFrom) {
                // ✅ Notify other users in the room
                connections[roomToRemoveFrom].forEach(member => {
                    io.to(member).emit("user-left", socket.id);
                });

                // ✅ Remove the socket from the room
                connections[roomToRemoveFrom] = connections[roomToRemoveFrom].filter(id => id !== socket.id);

                // ✅ If the room is now empty, delete it
                if (connections[roomToRemoveFrom].length === 0) {
                    delete connections[roomToRemoveFrom];
                }
            }

            // ✅ Clean up time tracking
            delete timeOnline[socket.id];
        });

    });

    return io;
};