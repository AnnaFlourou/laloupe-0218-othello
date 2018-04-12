import { Component, OnInit } from '@angular/core';
import { Player } from './../models/player';
import { Room } from './../models/room';

import { AuthService } from '../core/auth.service';
import { GamecoreService } from '../core/gamecore.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { log } from 'util';
import { Neighbor } from '../models/neighbor';
import { Direction } from '../models/direction';
import { Increment } from '../models/increment';
import { Position } from '../models/position';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  roomId: string;
  room: Room;
  endGame: boolean;
  ennemyPiece: number;
  myPiece: number;

  constructor(private auth: AuthService,
              private db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute,
              private gamecore: GamecoreService) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.db.doc<Room>('rooms/' + this.roomId).valueChanges()
      .subscribe((room) => {
        this.room = room;
      });
  }

  updateRoom() {
    this.db.doc<Room>('rooms/' + this.roomId).set(this.room);
  }

  getNeighbor(xPos: number, yPos: number, direction: Direction): Neighbor {
    const neighbor = new Neighbor();
    neighbor.direction = direction;

    const position = new Position();
    const increment = this.getIncrement(direction);
    position.x = xPos + increment.x;
    position.y = yPos + increment.y;

    neighbor.position = position;
    return neighbor;
  }

  getIncrement(direction: Direction): Increment {
    let xIncrement = 0;
    let yIncrement = 0;

    switch (direction) {
      case Direction.Up:
        xIncrement = -1;
        break;
      case Direction.UpRight:
        xIncrement = -1;
        yIncrement = 1;
        break;
      case Direction.Right:
        yIncrement = 1;
        break;
      case Direction.DownRight:
        xIncrement = 1;
        yIncrement = 1;
        break;
      case Direction.Down:
        xIncrement = 1;
        break;
      case Direction.DownLeft:
        xIncrement = 1;
        yIncrement = -1;
        break;
      case Direction.Left:
        yIncrement = -1;
        break;
      case Direction.UpLeft:
        xIncrement = -1;
        yIncrement = -1;
        break;
    }

    const increment = new Increment();
    increment.x = xIncrement;
    increment.y = yIncrement;
    return increment;
  }

  getOpponentNeighbors(xPos: number, yPos: number): Neighbor[] {
    const directions = [
      Direction.Up,
      Direction.UpRight,
      Direction.Right,
      Direction.DownRight,
      Direction.Down,
      Direction.DownLeft,
      Direction.Left,
      Direction.UpLeft,
    ];

    const list = [];

    for (const direction of directions) {
      const neighbor = this.getNeighbor(xPos, yPos, direction);
      if (neighbor.position.x >= 0 && neighbor.position.x < 8 &&
        neighbor.position.y >= 0 && neighbor.position.y < 8) {
        if (this.room.board[neighbor.position.x].line[neighbor.position.y] === this.ennemyPiece) {
          list.push(neighbor);
        }
      }
    }
    return list;
  }

  canPlay(x: number, y: number) {
    const opponentNeighbors = this.getOpponentNeighbors(x, y);
    console.log(opponentNeighbors);
    return true;

  }

  checkLine(x: number, y: number) {
    console.log('Check line in progress');
    if (y === 0) {
      let i = y + 1;
      while (this.room.board[x].line[i] === this.ennemyPiece) {
        console.log('Premiere boucle' + i);
        i += 1;
      }
      console.log('Sortie 1ere boucle' + i);

      if (this.room.board[x].line[i] === this.myPiece) {
        while (y !== i) {
          console.log('Changing ennemy piece !');
          this.room.board[x].line[i] = this.myPiece;
          i -= 1;
        }
      }
    }

    if (y === 7) {
      let i = y - 1;
      while (this.room.board[x].line[i] === this.ennemyPiece) {
        console.log('Premiere boucle' + i);
        i -= 1;
      }
      console.log('Sortie 1ere boucle' + i);

      if (this.room.board[x].line[i] === this.myPiece) {
        while (y !== i) {
          console.log('Changing ennemy piece !');
          this.room.board[x].line[i] = this.myPiece;
          i += 1;
        }
      }
    }

  }

  checkCol(x: number, y: number) {
    console.log('Check line in progress');
    if (x === 0) {
      let i = x + 1;
      while (this.room.board[x].line[i] === this.ennemyPiece) {
        console.log('Premiere boucle' + i);
        i += 1;
      }
      console.log('Sortie 1ere boucle' + i);

      if (this.room.board[x].line[i] === this.myPiece) {
        while (x !== i) {
          console.log('Changing ennemy piece !');
          this.room.board[x].line[i] = this.myPiece;
          i -= 1;
        }
      }
    }

    if (x === 7) {
      let i = x - 1;
      while (this.room.board[x].line[i] === this.ennemyPiece) {
        console.log('Premiere boucle' + i);
        i -= 1;
      }
      console.log('Sortie 1ere boucle' + i);

      if (this.room.board[x].line[i] === this.myPiece) {
        while (x !== i) {
          console.log('Changing ennemy piece !');
          this.room.board[x].line[i] = this.myPiece;
          i += 1;
        }
      }
    }

  }


  setPiece(x: number, y: number) {
    if (this.auth.myId === this.room.players[0].name) {
      this.ennemyPiece = 2;
      this.myPiece = 1;
      return;
    }
    this.ennemyPiece = 1;
    this.myPiece = 2;
  }

  putPiece(x: number, y: number) {
    this.room.board[x].line[y] = this.myPiece;
  }

  countPiece() {
    this.room.piece -= 1;
  }

  changeTurn() {
    this.room.turn = this.auth.myId;
  }

  isFinish() {
    if (this.room.piece === 0) { this.isWinner(); }
  }

  isWinner() {
    let player1: number = 0;
    let player2: number = 0;

    for (let line = 0; line < 8; line += 1) {
      for (let col = 0; col < 8; col += 1) {
        if (this.room.board[line].line[col] === 1) {
          player1 += 1;
        } else {
          player2 += 1;
        }
      }
    }

    if (player1 > player2) {
      this.room.winner = this.room.players[0].name;
    } else if (player1 < player2) {
      this.room.winner = this.room.players[1].name;
    } else {
      this.room.winner = 'No Winner';
      this.endGame = true;
      console.log(this.room.winner);
      return;
    }

    if (this.auth.myId === this.room.winner) {
      console.log('YOU WIN');
    } else { console.log('YOU LOOSE'); }

    this.endGame = true;
  }


  click(x: number, y: number) {
    this.setPiece(x, y);
    if (this.canPlay(x, y) === false) { return; }
    this.checkLine(x, y);
    this.checkCol(x, y);
    this.putPiece(x, y);
    this.countPiece();
    this.changeTurn();
    this.isFinish();

    this.updateRoom();
  }

  getClass(x: number, y: number) {
    if (this.room.board[x].line[y] === 1) { return 'disc-white'; }
    if (this.room.board[x].line[y] === 2) { return 'disc-black'; }
    if (this.room.board[x].line[y] === 0) { return 'disc-empty'; }
  }

}
