import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/data/services/api/auth.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const currentUser = this.authService.getUser;
        if (currentUser) {
            return true;
        }
        this.router.navigate(['/login'], {
            queryParams: { returnUrl: state.url }
        });
        return false;
    }
}
