// import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const socket = io();

const goOnline = (evt) => {
    
}

const goOffline = (evt) => {
    
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