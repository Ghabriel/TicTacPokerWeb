import { Component, OnInit } from '@angular/core';

import { NetworkService } from './../services/network.service';
import { GameMode, Player, PlayerStatus } from './../types';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
    public players: Player[];
    public loading: boolean = true;
    public customMatchMode: boolean = false;
    public selectedPlayerIndexes: Set<number> = new Set();
    public possibleGameModes: [string, GameMode][];

    public readonly PlayerStatus = PlayerStatus;

    constructor(private network: NetworkService) { }

    ngOnInit() {
        this.players = [];
        this.loading = true;
        this.customMatchMode = false;
        this.selectedPlayerIndexes.clear();
        this.possibleGameModes = [];

        this.network.getOnlinePlayers().then(players => {
            this.players = players;
            this.loading = false;
        });
    }

    play(playerIndex: number): void {
        // TODO
        alert(`play(${playerIndex})`);
    }

    playAI(): void {
        // TODO
    }

    playCustom(gameMode: GameMode): void {
        console.log(gameMode);
    }

    enterCustomMode(): void {
        this.customMatchMode = true;
        this.possibleGameModes = [
            ['1x1 (1 bot)', GameMode['1x1']],
            ['1x1x1 (2 bots)', GameMode['1x1x1']],
            ['1x1x1x1 (3 bots)', GameMode['1x1x1x1']],
            ['2x2 (3 bots)', GameMode['2x2']]
        ];
    }

    abortCustomMode(): void {
        this.customMatchMode = false;
        this.selectedPlayerIndexes.clear();
    }

    selectPlayer(index: number): void {
        if (!this.customMatchMode || this.players[index].status === PlayerStatus.IN_GAME) {
            return;
        }

        if (this.selectedPlayerIndexes.has(index)) {
            this.selectedPlayerIndexes.delete(index);
        } else {
            if (this.selectedPlayerIndexes.size === 3) {
                alert('Somente 4 jogadores podem estar numa partida.');
                return;
            }

            this.selectedPlayerIndexes.add(index);
        }

        const numPlayers = this.selectedPlayerIndexes.size;

        switch (numPlayers) {
            case 0:
                this.possibleGameModes = [
                    ['1x1 (1 bot)', GameMode['1x1']],
                    ['1x1x1 (2 bots)', GameMode['1x1x1']],
                    ['1x1x1x1 (3 bots)', GameMode['1x1x1x1']],
                    ['2x2 (3 bots)', GameMode['2x2']]
                ];
                break;
            case 1:
                this.possibleGameModes = [
                    ['1x1', GameMode['1x1']],
                    ['1x1x1 (1 bot)', GameMode['1x1x1']],
                    ['1x1x1x1 (2 bots)', GameMode['1x1x1x1']],
                    ['2x2 (2 bots)', GameMode['2x2']]
                ];
                break;
            case 2:
                this.possibleGameModes = [
                    ['1x1x1', GameMode['1x1x1']],
                    ['1x1x1x1 (1 bot)', GameMode['1x1x1x1']],
                    ['2x2 (1 bot)', GameMode['2x2']]
                ];
                break;
            case 3:
                this.possibleGameModes = [
                    ['1x1x1x1', GameMode['1x1x1x1']],
                    ['2x2', GameMode['2x2']]
                ];
                break;
        }
    }
}
