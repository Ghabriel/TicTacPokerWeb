import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { NetworkService } from './../services/network.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

    login(username: string, event: Event): void {
        event.preventDefault();
        this.network.login(username).then(token => {
            if (token === null) {
                // TODO
                return;
            }

            sessionStorage.setItem('tic-tac-poker-token', token);
            this.router.navigate(['/lobby']);
        });
    }
}
