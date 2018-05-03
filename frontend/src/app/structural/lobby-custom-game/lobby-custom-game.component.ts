import { Component, Input, OnInit } from '@angular/core';

import { NetworkService } from './../../services/network.service';
import { Player, PlayerStatus, PlayerType } from './../../types';

interface Bot {
    name: string;
    type: PlayerType.BOT;
}

type AnyPlayer = Player | Bot;

@Component({
    selector: 'app-lobby-custom-game',
    templateUrl: './lobby-custom-game.component.html',
    styleUrls: ['./lobby-custom-game.component.scss']
})
export class LobbyCustomGameComponent implements OnInit {
    @Input() players: Player[];
    public host: Player;
    public matchPlayers: AnyPlayer[];
    public playerTeams: { [index: number]: number };

    private numBots: number;

    constructor(
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
            this.playerTeams[index] = index + 1;
        });

        this.numBots = 0;

        this.network.getUsername().then(username => {
            if (username === null) {
                throw Error('null username');
            }

            this.host.name = username;
        });
    }

    addBot(): void {
        this.numBots++;

        const bot: Bot = {
            name: `Bot ${this.numBots}`,
            type: PlayerType.BOT
        };

        this.matchPlayers.push(bot);

        const numPlayers = this.matchPlayers.length;
        this.playerTeams[numPlayers - 1] = numPlayers;
    }

    changeTeam(playerIndex: number, team: number): void {
        this.playerTeams[playerIndex] = team;
    }

}
