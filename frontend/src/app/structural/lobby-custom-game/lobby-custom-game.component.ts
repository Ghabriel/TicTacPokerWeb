import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NetworkService } from './../../services/network.service';
import { AnyPlayer, Bot, Player, PlayerStatus, PlayerType, TeamMapping } from './../../types';

@Component({
    selector: 'app-lobby-custom-game',
    templateUrl: './lobby-custom-game.component.html',
    styleUrls: ['./lobby-custom-game.component.scss']
})
export class LobbyCustomGameComponent implements OnInit {
    @Input() players: Player[];
    @Output() abortCustom = new EventEmitter<void>();
    public host: Player;
    public matchPlayers: AnyPlayer[];
    public playerTeams: TeamMapping;
    public canStart: boolean;

    private numBots: number;

    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

    ngOnInit() {
        this.host = {
            name: '',
            status: PlayerStatus.AVAILABLE,
            type: PlayerType.HUMAN
        };

        this.matchPlayers = [this.host].concat(...this.players);

        this.playerTeams = {};
        this.matchPlayers.forEach((player, index) => {
            this.playerTeams[index] = index;
        });

        this.canStart = true;
        this.numBots = 0;

        this.network.getUsername().then(username => {
            if (username === null) {
                throw Error('null username');
            }

            this.host.name = username;
        });
    }

    addBot(): void {
        if (this.matchPlayers.length === 4) {
            return;
        }

        this.numBots++;

        const bot: Bot = {
            name: `Bot ${this.numBots}`,
            type: PlayerType.BOT
        };

        this.matchPlayers.push(bot);

        const botIndex = this.matchPlayers.length - 1;
        this.playerTeams[botIndex] = botIndex;
        this.refreshStartButton();
    }

    changeTeam(playerIndex: number, team: number): void {
        this.playerTeams[playerIndex] = team;
        this.refreshStartButton();
    }

    private refreshStartButton(): void {
        console.log(this.playerTeams);
        const playersPerTeam: number[] = [0, 0, 0, 0];

        for (const index in this.playerTeams) {
            if (this.playerTeams.hasOwnProperty(index)) {
                const team = this.playerTeams[index];
                playersPerTeam[team]++;
            }
        }

        const nonEmptyTeams = playersPerTeam.filter(v => v !== 0);
        const allEqual = !!nonEmptyTeams.reduce((a, b) => a === b ? a : NaN);
        this.canStart = allEqual;
    }

    remove(playerIndex: number): void {
        this.matchPlayers.splice(playerIndex, 1);

        while (playerIndex < this.matchPlayers.length) {
            this.playerTeams[playerIndex] = this.playerTeams[playerIndex + 1];
            playerIndex++;
        }

        delete this.playerTeams[this.matchPlayers.length];
        this.refreshStartButton();
    }

    start(): void {
        if (!this.canStart) {
            return;
        }

        this.network.startGame(this.matchPlayers, this.playerTeams).then(success => {
            this.router.navigate(['/game']);
        });
    }

    cancel(): void {
        this.abortCustom.emit();
    }

}
