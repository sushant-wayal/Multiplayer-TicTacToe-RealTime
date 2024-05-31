const socket = io("http://localhost:3001");

const wentOffline = () => {
    room = "";
    turn = "X";
    playerX.value = "";
    playerX.placeholder = "Player X";
    playerO.value = "";
    playerO.placeholder = "Player O";
    arr.forEach((_val,idx) => {
        arr[idx] = '-';
    })
    boxes.forEach((box) => {
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        box.classList.remove(...box.classList);
        box.classList.add("boxes");
    })
}

let room = "";

const goOnline = () => {
    if (fin) restartclick();
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
    socket.on("found", () => {
        connection++;
        if (side == "X") {
            playerX.value = "You";
            playerO.value = "Opponent";
            playerO.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
        } else {
            playerO.value = "You";
            playerX.value = "Opponent";
            playerX.dispatchEvent(new KeyboardEvent("keydown", {key: "Enter"}));
        }
    });
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
    socket.on("goOff", () => {
        socket.emit("leave", { room });
        wentOffline();
        goOnline();
    })
}

const goOffline = () => {
    // not working, yet to fix
    disabled = false;
    socket.emit("goOff", { room });
    wentOffline();
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