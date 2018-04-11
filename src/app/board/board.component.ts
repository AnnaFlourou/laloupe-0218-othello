import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  board: number[][];

  constructor() { }

  ngOnInit() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  click(x: number, y: number) {
    console.log('L' + x + 'C' + y);
    this.board[x][y] = 1;
  }

  getClass(x: number, y: number) {
    if (this.board[x][y] === 1) { return 'disc-white'; }
    if (this.board[x][y] === 2) { return 'disc-black'; }
    if (this.board[x][y] === 0) { return 'disc-empty'; }
  }
}
