export enum PlayerStatus {
    AVAILABLE = 'Disponível',
    IN_GAME = 'Em jogo'
}

export interface Player {
    name: string;
    status: PlayerStatus;
}

export enum GameMode {
    '1x1',
    '1x1x1',
    '1x1x1x1',
    '2x2'
}
