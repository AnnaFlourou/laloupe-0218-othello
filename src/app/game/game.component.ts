import { Player } from './../models/player';
import { Room } from './../models/room';

import { AuthService } from '../core/auth.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';
import { DocumentSnapshot } from '@firebase/firestore-types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(private db: AngularFirestore, private router: Router, private auth: AuthService) { }


  ngOnInit() {
  }

  // function to create rooms, and push a player.name based on a random number. 
  isClicked: boolean = false;
  waitMessage: boolean = false;

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');
    const snapshot = roomsCollection.snapshotChanges().take(1).subscribe((snapshot) => {
      const player = new Player();
      player.name = this.auth.myId;

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;
        if (room.players.length === 1) {
          room.players.push(player);
          room.turn = room.players[1].name;
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          this.router.navigate(['ingame', roomId, player.name]);
          return;
        }
      }
      const room = new Room();
      room.players = [player];
      this.waitMessage = true;
      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(room)))
        .then((doc) => {
          doc.onSnapshot((docs) => {
            if ((docs.data().players.length === 2)) {
              this.router.navigate(['ingame', doc.id, player.name]);
            }
          });
        });
    });
    this.isClicked = true;
  }
}
