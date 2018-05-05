import { GameController } from './GameController';
import { GamePlayer } from './types';

export class Game {
    private players: GamePlayer[];
    private controller: GameController;

    constructor(players: GamePlayer[]) {
        console.log('[GAME START]', players);
        this.players = players;
        this.controller = new GameController(players);
    }
}
