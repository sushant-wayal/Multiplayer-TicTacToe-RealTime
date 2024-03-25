import { io } from "../app.js";

const finder = [];
const waiter = [];

const play = () => {
    io.on("connection", (socket) => {
        socket.on("join", async () => {
            if (finder.length >= waiter.length) {
                waiter.push(socket.id);
                socket.emit("side", { side: "O" });
            } else {
                finder.push(socket.id);
                socket.emit("side", { side: "X" });
            }
            if (finder.indexOf(socket.id) !== -1) {
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
                finder.splice(finder.indexOf(socket.id), 1);
                waiter.splice(find, 1);
            }
        });
        socket.on("move", (data) => {
            let { move, room } = data;
            socket.to(room).emit("move", {move});
        });
    })
}

export default play