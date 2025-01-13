# Multiplayer Tic-Tac-Toe in Real Time

This repository contains a real-time multiplayer Tic-Tac-Toe game built using Node.js, Express, and Socket.io.  Two players can connect to the game and play against each other in real-time.

## Features

* Real-time gameplay using WebSockets.
* Simple and intuitive user interface.
* Player names can be customized.
* Visual win probability indicator.
* Game status indicator (Online/Offline).
* Reset and restart game functionality.

## Project Structure

The project is divided into two main parts:

* **Backend:** Handles game logic, connections, and real-time communication between players. Uses Node.js with Express and Socket.io.
* **Frontend:** Provides the user interface for the game.  Built with HTML, CSS, and JavaScript.

## Getting Started

1. Clone the repository: `git clone https://github.com/sushantwayal/Multiplayer-TicTacToe-RealTime.git`
2. Navigate to the `Backend` directory: `cd Backend`
3. Install dependencies: `npm install`
4. Start the backend server: `npm run dev`
5. Navigate to the `Frontend` directory in a new terminal: `cd Frontend`
6. Open `index.html` in your browser.

## How to Play

1. Open two browser windows or tabs, both pointed to `index.html`.
2. Toggle the "Go" button to "On" in both windows to connect to the server.
3. Enter player names (optional).
4. The first player to connect will be assigned "X", and the second will be "O".
5. Players take turns clicking on the grid to place their marks.
6. The game ends when one player gets three in a row, or the grid is full (a draw).
7. Reset or restart the game using the provided buttons.


## Technologies Used

* Node.js
* Express.js
* Socket.io
* HTML
* CSS
* JavaScript


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License

[ISC](LICENSE)
