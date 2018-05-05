import { TicTacPokerAchievementScheme } from './TicTacPokerAchievementScheme';
import { Board } from './Board';
import { Achievement, ScoreTable, AchievementScheme, Card, CardSuit, CardType } from './GameTypes';
import { GamePlayer, PlayerType } from './types';

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
const numBandits: number = 4;
const numWildcards: number = 4;

export class GameController {
    private players: GamePlayer[];
    private nameMapping: { [name: string]: GamePlayer };
    private boards: { [index: number]: Board };
    private deck: Card[];
    private hand: Card[];

    constructor(players: GamePlayer[]) {
        this.players = players;
        this.nameMapping = {};
        this.boards = {};
        this.deck = this.generateDeck();
        this.hand = [];

        for (const player of players) {
            if (player.type == PlayerType.HUMAN) {
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

    private generateDeck(): Card[] {
        const result: Card[] = [];

        for (let rank = 1; rank <= 13; rank++) {
            for (const suit in CardSuit) {
                result.push({
                    rank: rank,
                    suit: CardSuit[suit] as any as CardSuit,
                    type: CardType.NORMAL
                });
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
