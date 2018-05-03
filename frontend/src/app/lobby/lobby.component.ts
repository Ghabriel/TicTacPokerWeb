import { Component, OnInit } from '@angular/core';

import { NetworkService } from './../services/network.service';
import { Player } from './../types';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
    public customMatchMode: boolean = false;
    public customMatchPlayers: Player[] = [];

    constructor() { }

    ngOnInit() {
        this.customMatchMode = false;
    }

    initCustomMatch(players: Player[]): void {
        this.customMatchPlayers = players;
        this.customMatchMode = true;
    }

    abortCustomMatch(): void {
        this.customMatchMode = false;
    }

}
