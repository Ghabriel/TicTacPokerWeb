import * as socketio from 'socket.io';

interface PlayerConnection {
    socketId: string;
    name: string;
}

interface Player {
    name: string;
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
            name: name
        });
        console.log(`A user has connected. Users online: ${SocketController.connectedPlayers.length}`);

        socket.on('disconnect', () => {
            const players = SocketController.connectedPlayers;
            for (let i = 0; i < players.length; i++) {
                if (players[i].name == name) {
                    players.splice(i, 1);
                    break;
                }
            }
            console.log(`A user has disconnected. Users online: ${SocketController.connectedPlayers.length}`);
        });

        socket.on('getOnlinePlayers', (callback: Callback<Player[]>) => {
            const result: Player[] = [];

            for (const player of SocketController.connectedPlayers) {
                if (player.name != this.name) {
                    result.push({ name: player.name });
                }
            }

            callback(result);
        });
    }

    disconnect(): void {
        this.socket.disconnect(true);
    }

}
