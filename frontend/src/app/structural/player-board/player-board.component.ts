import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DropEvent } from 'ng2-drag-drop';

import { cardRanks } from './../../constants';
import { Achievement, BoardData, BoardMatrix, Card, CardSuit, CardType, GameMove, GamePlayer } from './../../types';

export type Mapping<Key extends string, Type> = {
    [a in Key]: Type;
};

export type AchievementMapping = Mapping<Achievement, string>;

@Component({
    selector: 'app-player-board',
    templateUrl: './player-board.component.html',
    styleUrls: ['./player-board.component.scss']
})
export class PlayerBoardComponent implements OnChanges {
    @Input() player: GamePlayer;
    @Input() board: BoardData;
    @Input() isLocalPlayer: boolean;
    @Input() isCurrentPlayer: boolean;
    @Output() play = new EventEmitter<GameMove>();

    public achievements: string[];

    public readonly cardRanks = cardRanks;
    public readonly CardType = CardType;
    public readonly CardSuit = CardSuit;

    private readonly shortenedAchievements: AchievementMapping = {
        [Achievement.PAIR]: 'P',
        [Achievement.THREE_OF_A_KIND]: 'T',
        [Achievement.FLUSH]: 'F',
        [Achievement.STRAIGHT]: 'S',
        [Achievement.STRAIGHT_FLUSH]: 'SF',
        [Achievement.ROYAL_STRAIGHT_FLUSH]: 'R'
    };

    constructor() { }

    ngOnChanges() {
        this.achievements = [];
        for (const achievement of this.board.achievements) {
            this.achievements.push(this.shortenedAchievements[achievement]);
        }
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
