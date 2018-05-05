import { AchievementScheme, BoardRow, Achievement, NormalCard, CardSuit } from './GameTypes';
import { ranksOf, suitsOf, isRankSequence } from './CardUtils';

export class TicTacPokerAchievementScheme implements AchievementScheme {
    analyse(row: BoardRow): Achievement[] {
        const cards = row.filter((card): card is NormalCard => card !== null);

        if (cards.length === 0) {
            return [];
        }

        const result: Achievement[] = [];
        const ranks = ranksOf(cards);
        const suits = suitsOf(cards);

        // 2 cards require 1 rank to be a pair, 3 cards require 2.
        const pair = ranks.size === cards.length - 1;

        pair && result.push(Achievement.PAIR);

        if (cards.length === 3) {
            const threeOfAKind = ranks.size === 1;
            const flush = suits.size === 1;
            const straight = isRankSequence(Array.from(ranks));
            const straightFlush = straight && flush;
            const royalStraightFlush = straightFlush && this.isRoyal(Array.from(ranks));

            threeOfAKind       && result.push(Achievement.THREE_OF_A_KIND);
            flush              && result.push(Achievement.FLUSH);
            straight           && result.push(Achievement.STRAIGHT);
            straightFlush      && result.push(Achievement.STRAIGHT_FLUSH);
            royalStraightFlush && result.push(Achievement.ROYAL_STRAIGHT_FLUSH);
        }

        return result;
    }

    private isRoyal(ranks: number[]): boolean {
        ranks.sort((a, b) => a - b);
        return ranks[0] === 1 && ranks[1] === 12 && ranks[2] === 13;
    }
}
