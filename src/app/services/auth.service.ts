import { Component, OnInit, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }  
  
  ngOnInit() {
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then( 
    () => {
      this.router.navigate(['game']);
    });
  }
  
  logout() {
    this.afAuth.auth.signOut();
  }



}
