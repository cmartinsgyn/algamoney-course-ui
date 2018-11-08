import { AuthService } from './auth.service';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevoke = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: AuthHttp,
    private auth: AuthService

    ) { }

    logout () {
      return this.http.delete(this.tokensRevoke, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccesssToken();
      });

    }
}
