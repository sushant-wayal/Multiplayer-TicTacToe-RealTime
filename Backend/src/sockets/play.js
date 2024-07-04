import { io } from "../app.js";

let waiting = null;

const play = () => {
    io.on("connection", (socket) => {
        console.log("connected", socket.id);
        socket.on("join", async () => {
            if (waiting) {
                socket.emit("side", { side: "O" });
                let room = socket.id + waiting;
                socket.join(room);
                io.sockets.sockets.get(waiting).join(room);
                io.to(waiting).emit("found", { opponent: socket.id });
                socket.emit("found");
                io.to(room).emit("joined", { room });
                waiting = null;
            } else {
                socket.emit("side", { side: "X" });
                waiting = socket.id;
            }
        });
        socket.on("move", ({ move, room }) => {
            socket.to(room).emit("move", {move});
        });
        socket.on("leave", ({ room }) => {
            socket.leave(room);
        });
        socket.on("finished", ({ room }) => {
            socket.leave(room);
        })
        socket.on("goOff", ({ room }) => {
            socket.to(room).emit("goOff");
            socket.leave(room);
        })
    })
}

export default play