# Multiplayer Tic-Tac-Toe in Real-Time

This project implements a real-time multiplayer Tic-Tac-Toe game using Node.js, Express, Socket.IO, and vanilla JavaScript on the front-end.  Two players can connect and play against each other in a web browser.

## Features

* **Real-time gameplay:**  Players' moves are instantly reflected on both clients.
* **Opponent matching:**  The server automatically pairs players who join the game.
* **Turn-based system:**  Enforces correct turn order and prevents invalid moves.
* **Win detection:**  Determines the winner or a draw and displays the result.
* **Game restart:** Option to restart the game after it finishes.
* **Player names:**  Players can enter their names.
* **Win probability visualization:**  A dynamic probability bar visualizes the win/draw probabilities for X and O.
* **Online/Offline status:** Allows players to go online/offline (though offline mode is currently not fully implemented).


## Files Description

* **app.js:** Sets up the Express server, handles CORS, and initializes Socket.IO.
* **constants.js:** (Currently empty) Intended for storing any constant values.
* **index.js:** The main entry point for the server-side application.
* **play.js:** Contains the Socket.IO logic for managing game rooms, player connections, and move synchronization.
* **socket.js (Client-side):** Handles client-side socket connections, emits events to the server, and updates the UI based on received events.
* **work.js (Client-side):**  Manages the front-end game logic, UI updates, win/draw conditions, and win probability calculations.


## Installation and Running

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`
4. Start the server: `npm start`
5. Open the `index.html` file in your web browser.


## Future Improvements

* Implement full offline functionality.
* Improve user interface and styling.
* Add more robust error handling.
* Consider adding a chat feature.


## Contributing

Contributions are welcome!  Please feel free to submit pull requests or open issues.
