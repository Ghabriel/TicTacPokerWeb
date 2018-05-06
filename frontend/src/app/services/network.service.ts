import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { AnyPlayer, GameData, Player, TeamMapping } from './../types';

@Injectable()
export class NetworkService {
    private socket: SocketIOClient.Socket;
    private username: string | null = null;

    constructor() {
        this.socket = io.connect();
    }

    login(name: string): Promise<string | null> {
        return this.emit('login', name);
    }

    authenticate(token: string): Promise<boolean> {
        return this.emit<string | null>('authentication', token).then(username => {
            this.username = username;
            return username !== null;
        });
    }

    isLoggedIn(): Promise<boolean> {
        return Promise.resolve(this.username !== null);
    }

    getUsername(): Promise<string | null> {
        return Promise.resolve(this.username);
    }

    getOnlinePlayers(): Promise<Player[]> {
        return this.emit('getOnlinePlayers');
    }

    startGame(players: AnyPlayer[], teams: TeamMapping): Promise<boolean> {
        return this.emit('startGame', players, teams);
    }

    getGameData(): Promise<GameData | null> {
        return this.emit('getGameData');
    }

    debug(message: string): void {
        this.emit('debug', message);
    }

    private emit<T>(event: string, ...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            this.socket.emit(event, ...args, data => {
                resolve(data);
            });
        });
    }

}
