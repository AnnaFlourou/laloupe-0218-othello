import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';

// Own Module
import { CoreModule } from './core/core.module';

// Config Firebase
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

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
import { IngameComponent } from './ingame/ingame.component';
import { TableComponent } from './table/table.component';

// Guard
import { AuthGuard } from './core/auth.guard';
import { BoardComponent } from './board/board.component';

const appRoutes: Routes = [
  { path: 'game', canActivate: [AuthGuard], component: GameComponent },
  { path: 'ingame/:id/:username', canActivate: [AuthGuard], component: IngameComponent },
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
    TableComponent,
    IngameComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    CoreModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
