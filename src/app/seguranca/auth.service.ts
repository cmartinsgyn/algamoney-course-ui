import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { environment } from 'src/environments/environment';

import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    // tslint:disable-next-line: deprecation
    private http: Http,
    private jwtHelper: JwtHelper
    ) {
      this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
      this.carregarToken();
    }

  login(usuario: string, senha: string): Promise<void> {

    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA=='); // senha de acesso a app na classe do back end

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body,
      { headers, withCredentials: true })
          .toPromise()
          .then(response => {
            this.armazenarToken(response.json().access_token);
          })
          .catch(response => {
            if (response.status === 400) {
              const responseJson = response.json();

            if (responseJson.error === 'invalid_grant') {
               return Promise.reject('Usuário ou Senha inválida!');
             }
            }
               return Promise.reject(response);
          });
  }

  obterNovoAccessToken() {
    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body,
        { headers, withCredentials: true })
      .toPromise()
      .then(response => {
        this.armazenarToken(response.json().access_token);

        console.log('Novo access token criado!');

        return Promise.resolve(null);
      })
      .catch(response => {
        console.error('Erro ao renovar token.', response);
        return Promise.resolve(null);
      });
  }

  limparAccesssToken () {
     localStorage.removeItem('token');
     this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
