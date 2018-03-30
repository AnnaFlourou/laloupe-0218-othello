import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

// Config Firebase
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

// Services
import { AuthService } from './services/auth.service';

// Config Routing
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ScoreHistoryComponent } from './score-history/score-history.component';
import { WallOfFameComponent } from './wall-of-fame/wall-of-fame.component';
import { ChatComponent } from './chat/chat.component';
import { ProfilComponent } from './profil/profil.component';
import { GameComponent } from './game/game.component';
import { TitleComponent } from './title/title.component';
import { FourOFourComponent } from './four-o-four/four-o-four.component';

const appRoutes: Routes = [
  { path: 'game', component: GameComponent },
  { path: '', component: AuthComponent },
  { path: '404', component: FourOFourComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ScoreHistoryComponent,
    WallOfFameComponent,
    ChatComponent,
    ProfilComponent,
    GameComponent,
    TitleComponent,
    FourOFourComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
