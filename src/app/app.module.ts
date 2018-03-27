import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ScoreHistoryComponent } from './score-history/score-history.component';
import { WallOfFameComponent } from './wall-of-fame/wall-of-fame.component';
import { ChatComponent } from './chat/chat.component';
import { ProfilComponent } from './profil/profil.component';
import { GameComponent } from './game/game.component';
import { TitleComponent } from './title/title.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ScoreHistoryComponent,
    WallOfFameComponent,
    ChatComponent,
    ProfilComponent,
    GameComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
