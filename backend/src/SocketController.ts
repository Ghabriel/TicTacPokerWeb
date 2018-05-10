import { Game } from './Game';
import * as socketio from 'socket.io';

import { AnyPlayer, Player, PlayerStatus, PlayerType, TeamMapping, Bot, GamePlayer, GameData } from './types';

const isBot = (player: AnyPlayer): player is Bot => {
    return player.type === PlayerType.BOT;
};

const isHuman = (player: AnyPlayer): player is Player => {
    return player.type === PlayerType.HUMAN;
};

interface PlayerConnection {
    socketId: string;
    name: string;
    status: PlayerStatus;
}

type Callback<T> = (value: T) => void;

export class SocketController {
    private static connectedPlayers: PlayerConnection[] = [];
    private static games: Game[] = [];

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
            callback(this.getOnlinePlayers());
        });

        socket.on('startGame', (players: AnyPlayer[], teams: TeamMapping, callback: Callback<boolean>) => {
            callback(this.startGame(players, teams));
        });

        socket.on('getGameData', (callback: Callback<GameData | null>) => {
            callback(this.getGameData());
        });

        socket.on('debug', (message: string) => {
            console.log('[DEBUG]', message);
        });

        this.broadcastOnlineList();
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
        this.broadcastOnlineList();
    }

    private getOnlinePlayers(): Player[] {
        const result: Player[] = [];

        for (const player of SocketController.connectedPlayers) {
            result.push({
                name: player.name,
                status: player.status,
                type: PlayerType.HUMAN
            });
        }

        return result;
    }

    private broadcastOnlineList(): void {
        this.socket.broadcast.emit('onlineListChange', this.getOnlinePlayers());
    }

    private startGame(players: AnyPlayer[], teams: TeamMapping): boolean {
        // TODO: check if all players are available

        const gamePlayers: GamePlayer[] = [];

        for (let i = 0; i < players.length; i++) {
            const player = players[i];
            let gamePlayer: GamePlayer;

            if (isHuman(player)) {
                gamePlayer = {
                    name: player.name,
                    team: teams[i],
                    index: i,
                    type: PlayerType.HUMAN,
                    socketId: this.socketIdOf(player.name)
                };
            } else {
                gamePlayer = {
                    name: player.name,
                    team: teams[i],
                    index: i,
                    type: PlayerType.BOT
                };
            }

            gamePlayers.push(gamePlayer);
        }

        const game = new Game(gamePlayers);
        SocketController.games.push(game);
        return true;
    }

    private socketIdOf(playerName: string): string {
        for (const connection of SocketController.connectedPlayers) {
            if (connection.name == playerName) {
                return connection.socketId;
            }
        }

        throw Error('Player not found');
    }

    private getGameData(): GameData | null {
        for (const game of SocketController.games) {
            if (game.hasHumanPlayer(this.name)) {
                return game.getData();
            }
        }

        return null;
    }
}
