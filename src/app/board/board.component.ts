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

  click(x: number, y: number) {
    if (this.room.board[x].line[y] !== 0) { return;}
    /* Distribute black and white pieces for players */
    if (this.auth.myId === this.room.players[0].name) {
      this.room.board[x].line[y] = 1;
    } else {
      this.room.board[x].line[y] = 2;
    }
    /* Count remaining pieces */
    this.room.piece -= 1;
    /* Turn System */
    this.room.turn = this.auth.myId;
    this.updateRoom();
    if (this.room.piece === 0) {
      let player1 = 0;
      let player2 = 0;

      for (let line = 0; line < 8; line += 1) {
        for (let col = 0; col < 8; col += 1) {
          if (this.room.board[line].line[col] === 1) {
            player1 += 1;
          } else {
            player2 += 1 ;
          }
        }
      }
      if (player1 > player2) {
        console.log('player1 wins!!');
      } else if (player1 < player2) {
        console.log('player2 wins!!');
      } else {
        console.log('Match NUL!!');
      }
    }
  }

  getClass(x: number, y: number) {
    if (this.room.board[x].line[y] === 1) { return 'disc-white'; }
    if (this.room.board[x].line[y] === 2) { return 'disc-black'; }
    if (this.room.board[x].line[y] === 0) { return 'disc-empty'; }
  }

}
