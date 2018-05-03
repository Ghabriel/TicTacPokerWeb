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
