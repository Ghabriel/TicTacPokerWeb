import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NetworkService } from './../services/network.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public error: string | null;

    private readonly tokenIdentifier = 'tic-tac-poker-token';

    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

    ngOnInit() {
        sessionStorage.removeItem(this.tokenIdentifier);
        this.error = null;
    }

    login(username: string, event: Event): void {
        event.preventDefault();
        this.error = null;
        this.network.login(username).then(token => {
            if (token === null) {
                this.error = 'Nome de usuário já em uso.';
                return;
            }

            sessionStorage.setItem(this.tokenIdentifier, token);
            this.router.navigate(['/lobby']);
        });
    }
}
