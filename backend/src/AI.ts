import { GameMove, Card, CardType } from './types';
import { Board } from './Board';

export const AI = (board: Board, hand: Card[]): GameMove => {
    const rows = board.getRows();
    let firstEmptySlot: {
        row: number;
        column: number;
    } | null = null;

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        const row = rows[rowIndex];
        let stop = false;

        for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
            const card = row[columnIndex];

            if (card === null) {
                firstEmptySlot = {
                    row: rowIndex,
                    column: columnIndex
                };

                stop = true;
                break;
            }
        }

        if (stop) {
            break;
        }
    }

    if (firstEmptySlot === null) {
        throw Error('Full board');
    }

    return {
        row: firstEmptySlot.row,
        column: firstEmptySlot.column,
        cardIndex: 0,
        type: CardType.NORMAL
    }
};
