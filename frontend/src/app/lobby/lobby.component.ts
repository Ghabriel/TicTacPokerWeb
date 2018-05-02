import { Component, OnInit } from '@angular/core';

import { NetworkService } from './../services/network.service';
import { Player, PlayerStatus } from './../types';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
    public players: Player[];
    public customMatchMode: boolean = false;
    public selectedPlayerIndexes: Set<number> = new Set();

    public readonly PlayerStatus = PlayerStatus;

    constructor(private network: NetworkService) { }

    ngOnInit() {
        this.customMatchMode = false;
        this.selectedPlayerIndexes.clear();

        this.network.getOnlinePlayers().then(players => {
            this.players = players;
        });
    }

    play(playerIndex: number): void {
        // TODO
    }

    playAI(): void {
        // TODO
    }

    enterCustomMode(): void {
        this.customMatchMode = true;
    }

    abortCustomMode(): void {
        this.customMatchMode = false;
        this.selectedPlayerIndexes.clear();
    }

    selectPlayer(index: number): void {
        if (this.selectedPlayerIndexes.has(index)) {
            this.selectedPlayerIndexes.delete(index);
        } else {
            this.selectedPlayerIndexes.add(index);
        }
    }
}
