import { Component, OnInit } from '@angular/core';
import { Player } from './../models/player';
import { Room } from './../models/room';

import { AuthService } from '../core/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { DocumentSnapshot } from '@firebase/firestore-types';
import { log } from 'util';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {

  roomId: string;
  room: Room;
  endGame: boolean;

  constructor(private auth: AuthService,
              private db: AngularFirestore,
              private router: Router,
              private route: ActivatedRoute) {
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

  canPlay(x: number, y: number) {
    if (this.room.board[x].line[y] !== 0) { return false; }
  }

  setPiece(x: number, y: number) {
    if (this.auth.myId === this.room.players[0].name) {
      this.room.board[x].line[y] = 1;
    } else {
      this.room.board[x].line[y] = 2;
    }
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
    if (this.canPlay(x, y) === false) { return; }
    this.setPiece(x, y);
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
