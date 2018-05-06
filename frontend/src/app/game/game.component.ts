import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NetworkService } from './../services/network.service';
import { CardSuit, CardType, GameData } from './../types';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
    public gameData: GameData;
    public loading: boolean = true;

    public readonly CardType = CardType;
    public readonly CardSuit = CardSuit;

    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

    ngOnInit() {
        this.loading = true;

        this.network.getGameData().then(gameData => {
            if (gameData === null) {
                // shoudn't happen since this route is guarded
                console.log('Null game data');
                this.router.navigate(['/lobby']);
                return;
            }

            this.gameData = gameData;
            this.loading = false;
        });
    }

}
