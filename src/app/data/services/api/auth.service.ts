import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ROUTES } from '../../constants/routes/api.routes';
import { INTERNAL_ROUTES } from '../../constants/routes/internal.routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<any>;
  public nameUser = 'nombredeusuario';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUser = new BehaviorSubject(
      JSON.parse(localStorage.getItem('nameUser'))
    );
  }

  get getUser(): any {
    return this.currentUser.value;
  }

  login(
    data: {
      email: string;
      password: string;
    }
  ): Observable<{
    error: boolean;
    msg: string;
    data: any;
  }> {
    const response = { error: true, msg: 'mensaje de error', data: null };
    return this.http.post<{
      error: boolean;
      msg: string;
      data: any;
    }>(
      API_ROUTES.AUTH.LOGIN,
      data
    ).pipe(
      map(r => {
        response.msg = r.msg;
        response.error = r.error;
        response.data = r.data;

        this.setUserToLocalStorage(r.data);
        if (!response.error) {
          this.router.navigateByUrl(INTERNAL_ROUTES.PANEL_USER_LIST);
        }
        return response;
      }),
      catchError(err => {
        return of(response);
      })
    );
  }

  logout() {
    localStorage.removeItem(this.nameUser);
    this.currentUser.next(null);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  private setUserToLocalStorage(user: any) {
    localStorage.setItem(this.nameUser, JSON.stringify(user));
    this.currentUser.next(user);
  }
}
