import { GamePlayer } from './types';

export class Game {
    constructor(players: GamePlayer[]) {
        console.log('[GAME START]', players);
    }
}
