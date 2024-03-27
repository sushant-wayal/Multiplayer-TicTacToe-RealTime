const socket = io("http://localhost:3001");

const goOnline = () => {
    socket.emit("join");
    let opponent = "waiting for opponent...";
    let side = "";
    socket.on("side", (data) => {
        side = data.side;
        console.log("side",side);
        if (side == "X") {
            playerO.placeholder = opponent;
        } else {
            playerX.placeholder = opponent;
        }
    });
    socket.on("found", (data) => {
        opponent = data.opponent;
        if (side == "X") {
            playerO.value = opponent;
            playerO.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
        } else {
            playerX.value = opponent;
            playerX.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
        }
    });
    let room = "";
    socket.on("joined", (data) => {
        room = data.room;
    });
    socket.on("move", (data) => {
        console.log("recived :",data.move);
        let { move } = data;
        disabled = false;
        document.querySelector(`#box${move}`).click();
    });
    let boxes = document.querySelectorAll(".boxes");
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if (disabled) {
                return;
            }
            console.log("turn :",turn)
            if (turn != side) {
                console.log("room", room)
                socket.emit("move", {
                    move: index+1,
                    room
                })
                if (room) {
                    disabled = true;
                }
            }
        })
    })
}

const goOffline = () => {
    socket.disconnect();
}

let playerStatus = document.querySelector("#status")
let playerStatusText = document.querySelector("#statusText");

playerStatus.addEventListener("click",() => {
    if (playerStatusText.innerText == "On") {
        playerStatusText.innerText = "Off";
        goOnline();
    }
    else {
        playerStatusText.innerText = "On";
        goOffline();
    }
});