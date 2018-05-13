import { isSameCard } from './CardUtils';
import { TicTacPokerAchievementScheme } from './TicTacPokerAchievementScheme';
import { Board } from './Board';
import { Achievement, ScoreTable, AchievementScheme, Card, CardSuit, CardType, GamePlayer, PlayerType, GameData, BoardMatrix, GameMove, NormalCard } from './types';
import { AI } from './AI';

const achievementScheme = new TicTacPokerAchievementScheme();

const scoreTable: ScoreTable = {
    [Achievement.PAIR]: 250,
    [Achievement.THREE_OF_A_KIND]: 1000,
    [Achievement.FLUSH]: 400,
    [Achievement.STRAIGHT]: 700,
    [Achievement.STRAIGHT_FLUSH]: 1500,
    [Achievement.ROYAL_STRAIGHT_FLUSH]: 2500
};

const numCardsInHand: number = 5;
const numBandits: number = 0;
const numWildcards: number = 0;

export class GameController {
    private players: GamePlayer[];
    private nameMapping: { [name: string]: GamePlayer };
    private boards: { [index: number]: Board };
    private deck: Card[];
    private hand: Card[];
    private currentPlayerIndex: number;

    constructor(players: GamePlayer[]) {
        this.players = players;
        this.nameMapping = {};
        this.boards = {};
        this.deck = this.generateDeck();
        this.hand = [];
        this.currentPlayerIndex = 0;

        for (const player of players) {
            if (player.type === PlayerType.HUMAN) {
                this.nameMapping[player.name] = player;
            }

            this.boards[player.index] = new Board(
                achievementScheme,
                scoreTable,
                3
            );
        }

        for (let i = 0; i < numCardsInHand; i++) {
            this.draw();
        }
    }

    getData(): GameData {
        const boards: { [index: number]: BoardMatrix } = {};

        for (const index in this.boards) {
            if (this.boards.hasOwnProperty(index)) {
                boards[index] = this.boards[index].getMatrix();
            }
        }

        return {
            players: this.players,
            boards: boards,
            hand: this.hand,
            currentPlayerIndex: this.currentPlayerIndex
        };
    }

    processMove(move: GameMove): void {
        const board = this.boards[this.currentPlayerIndex];
        const card = this.hand[move.cardIndex];

        this.hand.splice(move.cardIndex, 1);
        this.draw();

        switch (move.type) {
            case CardType.NORMAL:
                board.set(move.row, move.column, card as NormalCard);
                break;
            case CardType.BANDIT:
                // TODO: allow the stolen player to play twice in his next turn
                const stolenBoard = this.boards[move.stolenPlayerIndex];
                const stolenCard = stolenBoard.steal(move.stolenRow, move.stolenColumn);

                if (stolenCard === null) {
                    throw Error('Illegal move');
                }

                board.set(move.row, move.column, stolenCard);
                break;
            case CardType.WILDCARD:
                board.set(move.row, move.column, move.chosenCard);
                break;
        }

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    processNextTurn(): GameMove | null {
        const currentPlayer = this.players[this.currentPlayerIndex];

        if (currentPlayer.type === PlayerType.HUMAN) {
            return null;
        }

        const board = this.boards[this.currentPlayerIndex];
        return AI(board, this.hand);
    }

    private generateDeck(): Card[] {
        const result: Card[] = [];

        for (let rank = 1; rank <= 13; rank++) {
            for (const suit in CardSuit) {
                if (typeof CardSuit[suit] === 'number') {
                    result.push({
                        rank: rank,
                        suit: CardSuit[suit] as any as CardSuit,
                        type: CardType.NORMAL
                    });
                }
            }
        }

        for (let i = 0; i < numBandits; i++) {
            result.push({
                type: CardType.BANDIT
            });
        }

        for (let i = 0; i < numWildcards; i++) {
            result.push({
                type: CardType.WILDCARD
            });
        }

        this.shuffle(result);
        return result;
    }

    /**
     * Shuffles an array using the Durstenfeld Shuffle.
     * 
     * Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * 
     * @param arr the array to be shuffled (in-place)
     */
    private shuffle<T>(arr: T[]): void {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    private draw(): void {
        const nextCard = this.deck.pop();

        if (nextCard !== undefined) {
            this.hand.push(nextCard);
        }
    }
}
