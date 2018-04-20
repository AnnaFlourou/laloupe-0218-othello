import { Player } from './../models/player';
import { Room } from './../models/room';

import { Component, NgModule, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  imports: [
    FormsModule,
  ],

})
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {

  text: Observable<any[]>;
  message: string;
  chatBox;
  roomId: String;
  room: Room;

  constructor(private db: AngularFirestore, private router: Router,
              private route: ActivatedRoute, private auth: AuthService) {
    this.text = db.collection('rooms').valueChanges();
  }
  ngOnInit() {

    this.roomId = this.route.snapshot.paramMap.get('id');
    this.
      db.
      doc<Room>('rooms/' + this.roomId) 
      .valueChanges()
      .subscribe((room) => {
        this.room = room;
        this.chatBox = room.chat;
      });
  }
  chat() {
    this.chatBox.push(this.auth.name + ' : ' + this.message);
    this.db.doc('rooms/' + this.roomId).update(this.room);
  }
}
