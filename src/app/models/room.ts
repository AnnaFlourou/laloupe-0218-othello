import { Player } from './player';

export class Room {
  players: Player[];
  turn: number = 1;
  piece: number = 64;
  board: { line: number[] }[] = [
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 1, 2, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
  ];
  winner: number;
}



