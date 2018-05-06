import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { NetworkService } from './../services/network.service';

@Injectable()
export class GameGuard implements CanActivate {
    constructor(
        private router: Router,
        private network: NetworkService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise((resolve, reject) => {
            const token = sessionStorage.getItem('tic-tac-poker-token');

            if (token === null) {
                this.router.navigate(['/']);
                return resolve(false);
            }

            this.network.authenticate(token).then(success => {
                if (!success) {
                    this.router.navigate(['/']);
                    return resolve(false);
                }

                this.network.getGameData().then(data => {
                    if (data === null) {
                        this.router.navigate(['/lobby']);
                        return resolve(false);
                    }

                    resolve(true);
                });
            });
        });
    }
}
