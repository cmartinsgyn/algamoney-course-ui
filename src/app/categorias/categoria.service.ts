import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';
  // tslint:disable-next-line:max-line-length
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM2OTgxMDEyLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJlMzY2NmE1Yi1lMmNhLTRjMWQtYWVkZi1lN2UwNGIyOGQxMDgiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.IQfneXmleUntH0kQSLaD6IGDd2_f7e33v9m5HxKGj9s';

  constructor(private http: Http) { }

  // recebe token, temporariamente até impl login
  listarTodas(tokenDropDown): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', tokenDropDown);

    return this.http.get(`${this.categoriasUrl}`, { headers })
    .toPromise()
    .then(response => response.json());

  }
}
