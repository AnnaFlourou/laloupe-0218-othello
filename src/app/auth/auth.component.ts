import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
  ) { }

  ngOnInit() { }

  onLogin() {
    this.authService.googleLogin();
  }

  onLogout() {
    this.authService.signOut();
  }
}
