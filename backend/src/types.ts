export enum PlayerStatus {
    AVAILABLE = 'Disponível',
    IN_GAME = 'Em jogo'
}

export enum PlayerType {
    HUMAN,
    BOT
}

export interface Player {
    name: string;
    status: PlayerStatus;
    type: PlayerType.HUMAN;
}

export interface Bot {
    name: string;
    type: PlayerType.BOT;
}

export type AnyPlayer = Player | Bot;

export type TeamMapping = { [index: number]: number };

interface BaseGamePlayer {
    name: string;
    team: number;
    index: number;
    type: PlayerType;
}

export interface GameHuman extends BaseGamePlayer {
    socketId: string;
    type: PlayerType.HUMAN;
}

export interface GameBot extends BaseGamePlayer {
    type: PlayerType.BOT;
}

export type GamePlayer = GameHuman | GameBot;
