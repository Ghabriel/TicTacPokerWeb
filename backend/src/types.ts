export enum PlayerStatus {
    AVAILABLE = 'Disponível',
    IN_GAME = 'Em jogo'
}

export interface Player {
    name: string;
    status: PlayerStatus;
}
