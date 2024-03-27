let boxes = document.querySelectorAll(".boxes");

let turn = "X";

let player = document.querySelector(".player");

let playerX = document.querySelector("#playerX");
let playerO = document.querySelector("#playerO");

playerO.style.backgroundColor = "#7E9181";
playerX.style.backgroundColor = "#2E3532";

let playero = "";
let playerx = "";

playerO.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 13) {
        playero = playerO.value;
    }
});

playerX.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 13) {
        playerx = playerX.value;
    }
});

let arr = [];
for (let i = 0; i < 9; i++) {
    arr.push('-');
}

let fin = false;

function finished() {
    fin = true;
    player.classList.add("finish");
    player.classList.remove("player");
    playerX.style.visibility = "hidden";
    playerO.style.visibility = "hidden";
}

function Xwon() {
    playerx = playerX.value;
    if (playerx.length == 0) {
        playerx = "Player X";
    }
    document.querySelector(".finish").innerText = playerx+" Won this Game";
}

function Owon() {
    playero = playerO.value;
    if (playero.length == 0) {
        playero = "Player O";
    }
    document.querySelector(".finish").innerText = playero+" Won this Game";
}

const result = (arr) => {
    if (((arr[0] === arr[1]) && (arr[1] === arr[2]) && (arr[2] === 'x')) ||
        ((arr[3] === arr[4]) && (arr[4] === arr[5]) && (arr[5] === 'x')) ||
        ((arr[6] === arr[7]) && (arr[7] === arr[8]) && (arr[8] === 'x')) ||
        ((arr[0] === arr[3]) && (arr[3] === arr[6]) && (arr[6] === 'x')) ||
        ((arr[1] === arr[4]) && (arr[4] === arr[7]) && (arr[7] === 'x')) ||
        ((arr[2] === arr[5]) && (arr[5] === arr[8]) && (arr[8] === 'x')) ||
        ((arr[0] === arr[4]) && (arr[4] === arr[8]) && (arr[8] === 'x')) ||
        ((arr[2] === arr[4]) && (arr[4] === arr[6]) && (arr[6] === 'x'))   ) {
            return 'X';
    }
    else if(((arr[0] === arr[1]) && (arr[1] === arr[2]) && (arr[2] === 'o')) ||
            ((arr[3] === arr[4]) && (arr[4] === arr[5]) && (arr[5] === 'o')) ||
            ((arr[6] === arr[7]) && (arr[7] === arr[8]) && (arr[8] === 'o')) ||
            ((arr[0] === arr[3]) && (arr[3] === arr[6]) && (arr[6] === 'o')) ||
            ((arr[1] === arr[4]) && (arr[4] === arr[7]) && (arr[7] === 'o')) ||
            ((arr[2] === arr[5]) && (arr[5] === arr[8]) && (arr[8] === 'o')) ||
            ((arr[0] === arr[4]) && (arr[4] === arr[8]) && (arr[8] === 'o')) ||
            ((arr[2] === arr[4]) && (arr[4] === arr[6]) && (arr[6] === 'o'))   ) {
                return 'O';
    }
    else {
        let draw = true;
        arr.forEach((val) => {
            if (val === '-') {
                draw = false;
            }
        });
        if (draw) {
            return "Draw";
        }
        else {
            return "Unfinished";
        }
    }
}

const possible = (state,turn) => {
    let ans = [0,0,0];
    let res = result(state);
    if (res === "Unfinished") {
        for (let i = 0; i < 9; i++) {
            if (state[i] === '-') {
                let nextState = state.slice();
                nextState[i] = turn.toLowerCase();
                let nextAns;
                if (turn === 'X') {
                    nextAns = possible(nextState,'O');
                }
                else {
                    nextAns = possible(nextState,'X');
                }
                for (let j = 0; j < 3; j++) {
                    ans[j] += nextAns[j];
                }
            }
        }
    }
    else {
        if (res === 'X') {
            ans[0] = 1;
        }
        else if (res === 'O') {
            ans[1] = 1;
        }
        else if (res === "Draw") {
            ans[2] = 1;
        }
    }
    return ans;
}

const winProb = (state,turn) => {
    let prob = [];
    let poss = possible(state,turn);
    let sum = poss[0]+poss[1]+poss[2];
    prob[0] = (poss[0]/sum)*100;
    prob[1] = (poss[2]/sum)*100+prob[0];
    return prob;
}

let xColor = "#883677";
let oColor = "#CA61C3";
let dColor = "#A0AAB2";

async function change(ab,af,bb,bf) {
    let itr = 200;
    for (let i = 0; i < itr; i++) {
        await new Promise(resolve => {
            setTimeout(() => {
                probability = [ab+i*(af-ab)/(itr-1),bb+i*(bf-bb)/(itr-1)];
                probability = probability.map(value => Math.min(100, Math.max(0, value)));
                prob.style.background = `linear-gradient(to bottom, ${xColor} ${probability[0]}%, ${dColor} ${probability[0]}%, ${dColor} ${probability[1]}%, ${oColor} ${probability[1]}%)`;
                resolve();
            }, 1000/itr);
        });
    }
}

let initialProb = winProb(arr,'X');
initialProb = initialProb.map(value => Math.min(100, Math.max(0, value)));
prob.style.background = `linear-gradient(to bottom, ${xColor} ${initialProb[0]}%, ${dColor} ${initialProb[0]}%, ${dColor} ${initialProb[1]}%, ${oColor} ${initialProb[1]}%)`;

function setProb(state,turn) {
    let prob = document.querySelector("#prob");
    let probability = winProb(arr,turn);
    change(initialProb[0],probability[0],initialProb[1],probability[1]);
    initialProb = probability;
}

let disabled = false;

boxes.forEach((box,idx) => {
    box.addEventListener("click",(evt) => {
        console.log("clicked");
        if (!disabled) {
            if (!fin) {
                if (turn === "O") {
                    if (arr[idx] === '-') {
                        arr[idx] = 'o';
                        box.classList.add("O");
                        box.classList.remove("boxes");
                        turn = "X";
                        playerO.style.backgroundColor = "#7E9181";
                        playerX.style.backgroundColor = "#2E3532";
                    }
                    else {
                        alert("Invalid Move");
                    }
                }
                else if (turn === "X") {
                    if (arr[idx] === '-') {
                        arr[idx] = 'x';
                        box.classList.add("X");
                        box.classList.remove("boxes");
                        let l1 = document.createElement("div");
                        let l2 = document.createElement("div");
                        l1.classList.add("line1");
                        l2.classList.add("line2");
                        box.append(l1);
                        box.append(l2);
                        turn = "O";
                        playerX.style.backgroundColor = "#7E9181";
                        playerO.style.backgroundColor = "#2E3532";
                    }
                    else {
                        alert("Invalid Move");
                    }
                }
                let res = result(arr);
                let arr1 = winProb(arr,turn);
                if (res === 'X') {
                    finished();
                    Xwon();
                }
                else if (res === 'O') {
                    finished();
                    Owon();
                }
                else if (res === "Draw" || (arr1[0] === 0 && arr1[1] === 100)) {
                    finished();
                    document.querySelector(".finish").innerText = "Game has been Drawn";
                }
            }
            else {
                alert("Game is Over please restart the game");
            }
            setProb(arr,turn);
        } else {
            alert("Wait for opponent to play his move");
        }
    });
});

let restart = document.querySelector("#restart");

const restartclick = (evt) => {
    turn = "X";
    fin = false;
    arr.forEach((_val,idx) => {
        arr[idx] = '-';
    })
    setProb(arr,'X');
    boxes.forEach((box) => {
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
        box.classList.remove(...box.classList);
        box.classList.add("boxes");
    })
    document.querySelector(".finish").innerText = "";
    player.classList.remove(...player.classList);
    player.classList.add("player");
    playerX = document.createElement("input");
    playerX.type = "text";
    playerO = document.createElement("input");
    playerO.type = "text";
    playerX.id = "playerX";
    playerO.id = "playerO";
    player.append(playerX);
    player.append(playerO);
    playerO.style.backgroundColor = "#7E9181";
    if (playerx.length === 0) {
        playerX.placeholder = "Player X";
    }
    else {
        playerX.value = playerx;
    }
    if (playero.length === 0) {
        playerO.placeholder = "Player O";
    }
    else {
        playerO.value = playero;
    }
}

restart.addEventListener("click",restartclick);

let reset = document.querySelector("#reset");

reset.addEventListener("click",restartclick);
reset.addEventListener("click", (evt) => {
    playerX.placeholder = "Player X";
    playerO.placeholder = "Player O";
    playerx = "";
    playero = "";
    playerX.value = "";
    playerO.value = "";
})