import { Component, OnInit } from '@angular/core';

import { NetworkService } from './../services/network.service';
import { Player } from './../types';

@Component({
    selector: 'app-lobby',
    templateUrl: './lobby.component.html',
    styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
    public players: Player[];

    constructor(private network: NetworkService) { }

    ngOnInit() {
        this.network.getOnlinePlayers().then(players => {
            this.players = players;
        });
    }

}
