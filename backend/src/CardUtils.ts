import { NormalCard, CardSuit, Card, CardType } from './types';

export const isSameCard = (first: Card, second: Card): boolean => {
    if (first.type === CardType.NORMAL && second.type === CardType.NORMAL) {
        return first.rank === second.rank && first.suit === second.suit;
    }

    return first.type === second.type;
}

export const ranksOf = (cards: NormalCard[]): Set<number> => {
    return new Set(cards.map(c => c.rank).sort());
}

export const suitsOf = (cards: NormalCard[]): Set<CardSuit> => {
    return new Set(cards.map(c => c.suit));
}

export const isRankSequence = (ranks: number[]): boolean => {
    ranks.sort((a, b) => a - b);

    if (isSequence(ranks)) {
        return true;
    }

    if (ranks[0] !== 1) {
        return false;
    }

    ranks.shift();
    ranks.push(14);

    return isSequence(ranks);
}

export const isSequence = (numbers: number[]): boolean => {
    return numbers.every((current, index, arr) => {
        const next = arr[index + 1];
        return index === arr.length - 1
            || next - current === 1;
    });
}
