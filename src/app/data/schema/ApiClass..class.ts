import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

export class ApiClass {
    public url = environment.url;
    public isProduction = environment.production;

    constructor(
        protected http: HttpClient
    ) {}

    error(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage:_${error.message}`;
        }
        return of({error: true, msg: errorMessage, data: null});
    }
}
