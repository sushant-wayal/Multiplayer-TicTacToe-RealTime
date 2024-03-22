import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://localhost:5500',
    credentials: true,
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:5500',
    }
});

import play from './sockets/play.js';

const PORT = process.env.WEBSOCKET_PORT || 3001;

server.listen(PORT, () => {
    console.log(`WebSocket Server running on port ${PORT}`);
})

play();

export {
    app,
    io,
};