import { Player } from './../models/player';
import { Room } from './../models/room';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms() {
    const roomsCollection = this.db.collection<Room>('rooms');

    const snapshot = roomsCollection.snapshotChanges().take(1).subscribe((snapshot) => {
      const player = new Player();
      player.name = 'user' + Math.floor(Math.random() * 1000);
      // player.cards = [];

      for (const snapshotItem of snapshot) {
        const roomId = snapshotItem.payload.doc.id;
        const room = snapshotItem.payload.doc.data() as Room;
        if (room.players.length === 1) {
          room.players.push(player);
          this.db.doc('rooms/' + roomId).update(JSON.parse(JSON.stringify(room)));
          // this.router.navigate(['game', roomId, player.name]);
          return;
        }
      }
      const room = new Room();
      room.players = [player];
      this.db.collection('rooms')
        .add(JSON.parse(JSON.stringify(room)))
        // .then((doc) => {
        //  this.router.navigate(['game', doc.id, player.name]);
        // })
      ;
    });
  }
}
