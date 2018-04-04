import { Player } from './player';

export class Room {
  players: Player[];
  turn: number;
  piece: number = 64;
  winner: number;
  waitMessage: boolean = false;
}



