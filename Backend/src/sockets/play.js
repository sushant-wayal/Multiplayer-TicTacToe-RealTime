import { io } from "../app.js";

const getAllClients = async (roomName) => {
    io.sockets.adapter.rooms(roomName, (error, clients) => {
        if (error) {
            console.log(error);
        }
        else {
            return clients;
        }
    });
}

const play = () => {
    io.on("connection", (socket) => {
        socket.on("join", async () => {
            let finder = await getAllClients("finder");
            let waiter = await getAllClients("waiter");
            console.log("output",finder, waiter);
            if (finder.length >= waiter.length) {
                socket.join("waiter");
                socket.emit("side", { side: "O" });
            } else {
                socket.join("finder");
                socket.emit("side", { side: "X" });
            }
            if (socket.rooms.has("finder")) {
                let find = Math.floor(Math.random()*waiter.length);
                while (!io.sockets.sockets.has(waiter[find])) {
                    find = Math.floor(Math.random()*waiter.length);
                }
                io.to(waiter[find]).emit("found", {opponent: socket.id});
                io.to(socket.id).emit("found", {opponent: waiter[find]});
                let room = socket.id + waiter[find];
                socket.join(room);
                io.sockets.sockets.get(waiter[find]).join(room);
                io.to(room).emit("joined", { room });
                socket.leave("finder");
                io.sockets.sockets.get(waiter[find]).leave("waiter");
            }
        });
        socket.on("move", (data) => {
            let { move, room } = data;
            socket.to(room).emit("move", {move});
        });
    })
}

export default play