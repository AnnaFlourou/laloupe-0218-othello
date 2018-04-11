import { Player } from './player';

export class Room {
  players: Player[];
  turn: string;
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



