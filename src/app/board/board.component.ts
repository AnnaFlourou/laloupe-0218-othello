import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from './../models/player';
import { Room } from './../models/room';

import { AuthService } from '../core/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { Neighbor } from '../models/neighbor';
import { Direction } from '../models/direction';
import { Increment } from '../models/increment';
import { Position } from '../models/position';
import { Subscription } from 'rxjs/Rx';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit, OnDestroy {

  roomId: string;
  room: Room;
  ennemyPiece: number;
  myPiece: number;
  result: string = '';
  turn: string = '';
  scorePlayer1: number = 0;
  scorePlayer2: number = 0;
  subscription: Subscription;

  constructor(private auth: AuthService,
              private db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.subscription = this.db.doc<Room>('rooms/' + this.roomId).valueChanges()
                .subscribe((room) => {
                  this.room = room;
                  if (this.room.piece === 0) {
                    this.isFinish();
                  }
                  if (this.room.turn === this.auth.myId) {
                    this.turn = 'Opponent turn !';
                  } else {
                    this.turn = 'Your turn !';
                  }
                  this.scorePlayer1 = 0;
                  this.scorePlayer2 = 0;
                  for (let line = 0; line < 8; line += 1) {
                    for (let col = 0; col < 8; col += 1) {
                      if (this.room.board[line].line[col] === 1) {
                        this.scorePlayer1 += 1;
                      } else if (this.room.board[line].line[col] === 2) {
                        this.scorePlayer2 += 1;
                      }
                    }
                  }
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
    let canIPlay: boolean;
    let count = 0;

    const opponentNeighbors = this.getOpponentNeighbors(x, y);
    if (opponentNeighbors.length === 0 || this.room.board[x].line[y] !== 0) { return false; }

    for (const ennemy of opponentNeighbors) {
      const list = [ennemy];
      let trigger = true;

      while (trigger) {
        const lastOpponent = this.getNeighbor(list[list.length - 1].position.x,
                                              list[list.length - 1].position.y,
                                              list[list.length - 1].direction);
        if (lastOpponent.position.x >= 0 && lastOpponent.position.x < 8 &&
          lastOpponent.position.y >= 0 && lastOpponent.position.y < 8) {
          if (this.room.board[lastOpponent.position.x].
            line[lastOpponent.position.y] === this.ennemyPiece) {
            list.push(lastOpponent);

          } else if (this.room.board[lastOpponent.position.x]
            .line[lastOpponent.position.y] === this.myPiece) {
            for (const changeEnnemy of list) {
              this.room.board[changeEnnemy.position.x].line[changeEnnemy.position.y] = this.myPiece;
              count += 1;
              trigger = false;
            }
          } else {
            break;
          }
        } else { break; }
      }
    }

    count !== 0 ? canIPlay = true : canIPlay = false;

    return canIPlay;

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

  changeTurn(x: number = 0) {
    this.room.turn = this.auth.myId;
    if (x === 1) { this.updateRoom(); }
  }

  isFinish() {
    if (this.room.piece === 0) {
      this.isWinner();
    }
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
      this.result = 'Draw';
      return;
    }

    if (this.auth.myId === this.room.winner) {
      this.result = 'You Win !';
    } else { this.result = 'You Loose !'; }

  }

  click(x: number, y: number) {
    this.setPiece(x, y);
    if (!(this.canPlay(x, y))) { return; }
    this.putPiece(x, y);
    this.countPiece();
    this.changeTurn();
    this.updateRoom();
  }

  getClass(x: number, y: number) {
    if (this.room.board[x].line[y] === 1) { return 'disc-white'; }
    if (this.room.board[x].line[y] === 2) { return 'disc-black'; }
    if (this.room.board[x].line[y] === 0) { return 'disc-empty'; }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
