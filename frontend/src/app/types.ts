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

export enum GameMode {
    '1x1',
    '1x1x1',
    '1x1x1x1',
    '2x2'
}
