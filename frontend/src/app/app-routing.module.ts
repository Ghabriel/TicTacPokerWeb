import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LobbyGuard } from './guards/lobby.guard';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'lobby', component: LobbyComponent, canActivate: [LobbyGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
