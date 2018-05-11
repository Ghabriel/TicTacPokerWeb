import { Component, Input, OnInit } from '@angular/core';

import { BoardMatrix, CardSuit, CardType, GamePlayer } from './../../types';

@Component({
    selector: 'app-player-board',
    templateUrl: './player-board.component.html',
    styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnInit {
    @Input() player: GamePlayer;
    @Input() board: BoardMatrix;
    @Input() isLocalPlayer: boolean;
    @Input() isCurrentPlayer: boolean;

    public readonly CardType = CardType;
    public readonly CardSuit = CardSuit;

    constructor() { }

    ngOnInit() {
    }

}
