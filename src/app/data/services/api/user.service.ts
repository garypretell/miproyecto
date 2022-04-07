import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {catchError, map} from 'rxjs/operators';
import { ApiClass } from '../../schema/ApiClass..class';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiClass {

  /**
   * Get all user from api
   */
  getAllUsers(): Observable<{
    error: boolean,
    msg: string;
    data: any[]
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<any[]>(this.url + 'users')
    .pipe(
      map( r => {
        response.data = r;
        return response;
      }),
      catchError(this.error)
    );
  }

  /**
   * Get one user by id
   * @param id number
   */
  getUserById(id: number): Observable<{
    error: boolean,
    msg: string,
    data: any
  }> {
    const response = {error: false, msg: '', data: null};
    return this.http.get<any>(this.url + 'users/' + id)
      .pipe(
        map( r => {
            response.data = r;
            return response;
          }
        ),
        catchError(this.error)
      );
  }
}
