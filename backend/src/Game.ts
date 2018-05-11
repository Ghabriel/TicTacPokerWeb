import { GameController } from './GameController';
import { GamePlayer, PlayerType, GameData, GameMove } from './types';

export class Game {
    private players: GamePlayer[];
    private controller: GameController;

    constructor(players: GamePlayer[]) {
        console.log('[GAME START]', players);
        this.players = players;
        this.controller = new GameController(players);
    }

    hasHumanPlayer(name: string): boolean {
        for (const player of this.players) {
            if (player.type !== PlayerType.HUMAN) {
                continue;
            }

            if (player.name === name) {
                return true;
            }
        }

        return false;
    }

    getData(): GameData {
        return this.controller.getData();
    }

    processMove(move: GameMove): void {
        this.controller.processMove(move);
    }
}
