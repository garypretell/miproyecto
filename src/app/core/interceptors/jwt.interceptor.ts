import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/data/services/api/auth.service';

export const SkipInsterceptorAuthHeader = 'X-Skip-Auth-Interceptor';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor( private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.getUser;
    const isAuthenticated = currentUser && currentUser.token;
    if (isAuthenticated) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }
    return next.handle(req);
  }
}
