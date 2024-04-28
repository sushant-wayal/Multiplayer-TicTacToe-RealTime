import { io } from "../app.js";

let waiting = null;

const play = () => {
    io.on("connection", (socket) => {
        socket.on("join", async () => {
            if (waiting) {
                socket.emit("side", { side: "O" });
                let room = socket.id + waiting;
                socket.join(room);
                io.sockets.sockets.get(waiting).join(room);
                io.to(waiting).emit("found", { opponent: socket.id });
                socket.emit("found", { opponent: waiting });
                io.to(room).emit("joined", { room });
                waiting = null;
            } else {
                socket.emit("side", { side: "X" });
                waiting = socket.id;
            }
        });
        socket.on("move", (data) => {
            let { move, room } = data;
            socket.to(room).emit("move", {move});
        });
        socket.on("disconnect", () => {
            if (finder.indexOf(socket.id) !== -1) {
                finder.splice(finder.indexOf(socket.id), 1);
            }
            if (waiter.indexOf(socket.id) !== -1) {
                waiter.splice(waiter.indexOf(socket.id), 1);
            }
        });
    })
}

export default play