import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { AuthComponent } from "./auth/auth.component";
import { ScoreHistoryComponent } from "./score-history/score-history.component";
import { WallOfFameComponent } from "./wall-of-fame/wall-of-fame.component";
import { ChatComponent } from "./chat/chat.component";
import { ProfilComponent } from "./profil/profil.component";
import { GameComponent } from "./game/game.component";
import { TitleComponent } from "./title/title.component";
import { FourOFourComponent } from "./four-o-four/four-o-four.component";

const appRoutes: Routes = [
  { path: "login", component: AuthComponent },
  { path: "game", component: GameComponent },
  { path: "", component: AuthComponent },
  { path: "404", component: FourOFourComponent },
  { path: "**", redirectTo: "404" }
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
    FourOFourComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
