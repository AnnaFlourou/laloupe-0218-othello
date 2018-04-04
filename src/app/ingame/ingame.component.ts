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
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.css'],
})
export class IngameComponent implements OnInit {

  constructor(private db: AngularFirestore, private router: Router) { }

  ngOnInit() {
  }

}
