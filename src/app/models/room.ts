import { Player } from './player';

export class Room {
  players: Player[];
  turn: string;
  piece: number = 60;
  board: { line: number[] }[] = [
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 1, 2, 0, 0, 0] },
    { line: [0, 0, 0, 2, 1, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
    { line: [0, 0, 0, 0, 0, 0, 0, 0] },
  ];
  winner: string;
  waiting:boolean = true;
  quit: boolean = false;
}



