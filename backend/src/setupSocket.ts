import * as http from 'http';
import * as jwt from 'jsonwebtoken';
import * as socketio from 'socket.io';

import { SocketController } from './SocketController';

type Token = string;
type Callback<T> = (value: T) => void;

export const setupSocket = (server: http.Server): void => {
    const io = socketio(server);
    const jwtSecret = 'temp';
    const playerSockets: { [name: string]: SocketController } = {};

    io.on('connection', (socket) => {
        socket.on('login', (name: string, callback: Callback<Token | null>) => {
            if (playerSockets.hasOwnProperty(name)) {
                return callback(null);
            }

            const encoded: Token = jwt.sign({ name }, jwtSecret);
            callback(encoded);
        });

        socket.on('authentication', (token: Token, callback: Callback<boolean>) => {
            let name: string;
            try {
                const decoded = jwt.verify(token, jwtSecret) as { name: string };
                name = decoded.name;
            } catch (err) {
                // console.log(err);
                return callback(false);
            }

            if (playerSockets.hasOwnProperty(name)) {
                // The user is already logged in
                playerSockets[name].disconnect();
            }

            playerSockets[name] = new SocketController(io, socket, name);
            callback(true);
        });
    });
};
