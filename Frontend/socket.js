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
        let { move } = data;
        // make move
    });
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