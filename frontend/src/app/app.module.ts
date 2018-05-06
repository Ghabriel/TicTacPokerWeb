import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyGuard } from './guards/lobby.guard';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';
import { NetworkService } from './services/network.service';
import { NavbarComponent } from './structural/navbar/navbar.component';
import { LobbyUserListComponent } from './structural/lobby-user-list/lobby-user-list.component';
import { LobbyCustomGameComponent } from './structural/lobby-custom-game/lobby-custom-game.component';
import { TeamSelectorComponent } from './structural/team-selector/team-selector.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LobbyComponent,
    LobbyUserListComponent,
    LobbyCustomGameComponent,
    TeamSelectorComponent,
    GameComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    LobbyGuard,
    NetworkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
