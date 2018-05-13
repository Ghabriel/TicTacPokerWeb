import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { NetworkService } from './../../services/network.service';
import { AnyPlayer, Player, PlayerStatus, PlayerType, TeamMapping } from './../../types';

@Component({
    selector: 'app-lobby-user-list',
    templateUrl: './lobby-user-list.component.html',
    styleUrls: ['./lobby-user-list.component.scss']
})
export class LobbyUserListComponent implements OnInit {
    @Output() initCustom = new EventEmitter<Player[]>();
    @Output() startGame = new EventEmitter<[AnyPlayer[], TeamMapping]>();
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

    playHuman(playerIndex: number): void {
        this.play(this.players[playerIndex]);
    }

    playAI(): void {
        this.play({
            name: 'Bot 1',
            type: PlayerType.BOT
        });
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

    private self(): Player {
        for (const player of this.players) {
            if (player.name === this.username) {
                return player;
            }
        }

        throw Error('Local player not found');
    }

    private play(opponent: AnyPlayer): void {
        const matchPlayers: AnyPlayer[] = [this.self(), opponent];
        const teams: TeamMapping = { 0: 0, 1: 1 };

        this.startGame.emit([matchPlayers, teams]);
    }
}
