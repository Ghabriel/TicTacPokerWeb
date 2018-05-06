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

export enum CardSuit {
    SPADES,
    HEARTS,
    CLUBS,
    DIAMONDS
}

export enum CardType {
    NORMAL,
    BANDIT,
    WILDCARD
}

export interface SpecialCard {
    type: CardType.BANDIT | CardType.WILDCARD;
}

export interface NormalCard {
    rank: number; // 1 to 13
    suit: CardSuit;
    type: CardType.NORMAL;
}

export type Card = SpecialCard | NormalCard;

export enum Achievement {
    PAIR = 'Par',
    THREE_OF_A_KIND = 'Trinca',
    FLUSH = 'Flush',
    STRAIGHT = 'Straight',
    STRAIGHT_FLUSH = 'Straight Flush',
    ROYAL_STRAIGHT_FLUSH = 'Royal Straight Flush'
}

export type ScoreTable = {
    [a in Achievement]: number;
};

export type BoardRow = (NormalCard | null)[];
export type BoardMatrix = BoardRow[];

export interface AchievementScheme {
    analyse(row: BoardRow): Achievement[];
}

export interface GameData {
    players: GamePlayer[];
    boards: { [index: number]: BoardMatrix };
    hand: Card[];
}
