import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css'],
})
export class ProfilComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onLogout() {
    this.authService.signOut();
  }
}
