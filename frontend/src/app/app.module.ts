import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2DragDropModule } from 'ng2-drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameGuard } from './guards/game.guard';
import { LobbyGuard } from './guards/lobby.guard';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';
import { NetworkService } from './services/network.service';
import { LobbyCustomGameComponent } from './structural/lobby-custom-game/lobby-custom-game.component';
import { LobbyUserListComponent } from './structural/lobby-user-list/lobby-user-list.component';
import { NavbarComponent } from './structural/navbar/navbar.component';
import { PlayerBoardComponent } from './structural/player-board/player-board.component';
import { TeamSelectorComponent } from './structural/team-selector/team-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LobbyComponent,
    LobbyUserListComponent,
    LobbyCustomGameComponent,
    TeamSelectorComponent,
    GameComponent,
    PlayerBoardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    Ng2DragDropModule.forRoot()
  ],
  providers: [
    GameGuard,
    LobbyGuard,
    NetworkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
