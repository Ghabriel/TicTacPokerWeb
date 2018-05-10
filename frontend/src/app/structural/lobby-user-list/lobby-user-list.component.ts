import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NetworkService } from './../../services/network.service';
import { Player, PlayerStatus } from './../../types';

@Component({
    selector: 'app-lobby-user-list',
    templateUrl: './lobby-user-list.component.html',
    styleUrls: ['./lobby-user-list.component.scss']
})
export class LobbyUserListComponent implements OnInit {
    @Output() initCustom = new EventEmitter<Player[]>();
    public players: Player[];
    public loading: boolean = true;
    public customMatchMode: boolean = false;
    public selectedPlayerIndexes: Set<number> = new Set();
    public username: string;

    public readonly PlayerStatus = PlayerStatus;

    constructor(private network: NetworkService) { }

    ngOnInit() {
        this.players = [];
        this.loading = true;
        this.customMatchMode = false;
        this.selectedPlayerIndexes.clear();

        this.network.getUsername().then(name => {
            if (name === null) {
                // can't happen because there's a lobby guard.
                alert('Erro interno. Contate o administrador.');
                return;
            }

            this.username = name;

            this.network.getOnlinePlayers().then(players => {
                this.players = players;
                this.loading = false;
            });

            this.network.addOnlineListObserver(list => {
                this.players = list;
            });
        });
    }

    play(playerIndex: number): void {
        // TODO
        alert(`play(${playerIndex})`);
    }

    playAI(): void {
        // TODO
        alert('play(AI)');
    }

    enterCustomMode(): void {
        this.customMatchMode = true;
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
    }

    proceedCustomCreation(): void {
        const sortedIndexes: number[] = [];

        this.selectedPlayerIndexes.forEach(index => {
            sortedIndexes.push(index);
        });

        sortedIndexes.sort();

        this.initCustom.emit(sortedIndexes.map(index => this.players[index]));
    }
}
