import * as socketio from 'socket.io';

import { Player, PlayerStatus } from './types';

interface PlayerConnection {
    socketId: string;
    name: string;
    status: PlayerStatus;
}

type Callback<T> = (value: T) => void;

export class SocketController {
    private static connectedPlayers: PlayerConnection[] = [];

    constructor(
        private io: socketio.Server,
        private socket: socketio.Socket,
        private name: string
    ) {
        SocketController.connectedPlayers.push({
            socketId: socket.id,
            name: name,
            status: PlayerStatus.AVAILABLE
        });
        // console.log(`A user has connected. Users online: ${SocketController.connectedPlayers.length}`);

        socket.on('getOnlinePlayers', (callback: Callback<Player[]>) => {
            const result: Player[] = [];

            for (const player of SocketController.connectedPlayers) {
                if (player.name != this.name) {
                    result.push({
                        name: player.name,
                        status: player.status
                    });
                }
            }

            callback(result);
        });
    }

    disconnect(): void {
        this.socket.disconnect(true);
    }

    onDisconnect(): void {
        const players = SocketController.connectedPlayers;

        for (let i = 0; i < players.length; i++) {
            if (players[i].name == this.name) {
                players.splice(i, 1);
                break;
            }
        }

        // console.log(`A user has disconnected. Users online: ${SocketController.connectedPlayers.length}`);
    }
}
