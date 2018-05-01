import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyGuard } from './guards/lobby.guard';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';
import { NetworkService } from './services/network.service';
import { NavbarComponent } from './structural/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LobbyComponent
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
