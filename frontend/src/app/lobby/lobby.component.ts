import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NetworkService } from './../services/network.service';
import { AnyPlayer, Player, TeamMapping } from './../types';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
    public customMatchMode: boolean = false;
    public customMatchPlayers: Player[] = [];

    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

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

    start([matchPlayers, playerTeams]: [AnyPlayer[], TeamMapping]): void {
        this.network.startGame(matchPlayers, playerTeams).then(success => {
            if (success) {
                this.router.navigate(['/game']);
            } else {
                // TODO: show error message
                console.log('Failed to start game.');
            }
        });
    }

}
