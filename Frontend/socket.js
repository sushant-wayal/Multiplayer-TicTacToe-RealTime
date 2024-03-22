const socket = io("http://localhost:3001");

let socketPlayerX = document.querySelector("#playerX");
let socketPlayerO = document.querySelector("#playerO");

const goOnline = () => {
    socket.emit("join");
    const side = "";
    socket.on("side", (data) => {
        side = data.side;
        if (side == "X") {
            playerO.placeholder = opponent;
        } else {
            playerX.placeholder = opponent;
        }
    });
    const opponent = "waiting for opponent...";
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
    const room = "";
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