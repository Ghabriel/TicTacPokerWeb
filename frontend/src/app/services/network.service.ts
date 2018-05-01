import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Player } from './../types';

@Injectable()
export class NetworkService {
    private socket: SocketIOClient.Socket;
    private loggedIn: boolean = false;

    constructor() {
        this.socket = io.connect();
    }

    login(name: string): Promise<string | null> {
        return this.emit('login', name);
    }

    authenticate(token: string): Promise<boolean> {
        return this.emit<boolean>('authentication', token).then(success => {
            this.loggedIn = success;
            return success;
        });
    }

    isLoggedIn(): Promise<boolean> {
        return Promise.resolve(this.loggedIn);
    }

    getOnlinePlayers(): Promise<Player[]> {
        return this.emit('getOnlinePlayers');
    }

    private emit<T>(event: string, ...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            this.socket.emit(event, ...args, data => {
                resolve(data);
            });
        });
    }

}
