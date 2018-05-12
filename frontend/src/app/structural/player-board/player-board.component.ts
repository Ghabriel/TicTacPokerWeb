import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropEvent } from 'ng2-drag-drop';

import { BoardMatrix, Card, CardSuit, CardType, GameMove, GamePlayer } from './../../types';

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
    @Output() play = new EventEmitter<GameMove>();

    public readonly CardType = CardType;
    public readonly CardSuit = CardSuit;

    constructor() { }

    ngOnInit() {
    }

    process(row: number, column: number, event: DropEvent): void {
        if (this.isLocalPlayer && this.isCurrentPlayer) {
            const move: GameMove = {
                row,
                column,
                cardIndex: event.dragData,
                type: CardType.NORMAL
            };

            this.play.emit(move);
        }
    }

}
