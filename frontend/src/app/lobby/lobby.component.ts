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

    constructor() { }

    ngOnInit() {
        this.customMatchMode = false;
    }

    initCustomMatch(players: Player[]): void {
        this.customMatchMode = true;
        console.log(players);
    }

    abortCustomMatch(): void {
        this.customMatchMode = false;
    }

}
