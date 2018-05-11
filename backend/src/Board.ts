import { Achievement, AchievementScheme, BoardMatrix, BoardRow, ScoreTable, NormalCard } from './types';

export class Board {
    private rows: BoardMatrix;
    private columns: BoardMatrix;
    private score: number | null = null;
    private achievements: Achievement[] = [];

    constructor(
        private achievementScheme: AchievementScheme,
        private scoreTable: ScoreTable,
        size: number
    ) {
        this.rows = [];
        this.columns = [];
        for (let i = 0; i < size; i++) {
            this.rows.push(Array(size).fill(null));
            this.columns.push(Array(size).fill(null));
        }
    }

    getMatrix(): BoardMatrix {
        return this.rows;
    }

    getScore(): number {
        if (this.score !== null) {
            return this.score;
        }

        let score: number = 0;
        const achievements: Achievement[] = [];
        const groups = [
            ...this.rows,
            ...this.columns,
            ...this.getDiagonals()
        ];

        for (const group of groups) {
            const achievementList = this.achievementScheme.analyse(group);

            for (const achievement of achievementList) {
                score += this.scoreTable[achievement];
                achievements.push(achievement);
            }
        }

        this.score = score;
        this.achievements = achievements;

        return this.score;
    }

    set(row: number, column: number, card: NormalCard): void {
        this.internalSet(row, column, card);
    }

    steal(row: number, column: number): NormalCard | null {
        const card = this.rows[row][column];
        this.internalSet(row, column, null);
        return card;
    }

    private internalSet(row: number, column: number, card: NormalCard | null): void {
        this.rows[row][column] = card;
        this.columns[column][row] = card;
        this.score = null;
    }

    private getDiagonals(): BoardRow[] {
        const rows = this.rows;
        return [
            [rows[0][0], rows[1][1], rows[2][2]],
            [rows[0][2], rows[1][1], rows[2][0]]
        ];
    }
}
