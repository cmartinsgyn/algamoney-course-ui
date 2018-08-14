import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

export class PessoaFiltro {
 nome: string;
 pagina = 0;
 itensOfPage = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM0MjUyNDc1LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI4MzU2MjJhOC0xZDdiLTRhOTEtODA0Ni1lY2Q5MWNmMzU5NjUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.Y2K3jcdEMOwlLdG8ALW8c8QcqK79dGQ3F-Y7RLPXr54');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensOfPage.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

   return this.http.get(`${this.pessoasUrl}`, {headers, search: params})
   .toPromise()
   .then(response => {
     const responseJson = response.json();
     const pessoas = responseJson.content;

     const resultadoPessoa = {
       pessoas,
       total: responseJson.totalElements
     };
     return resultadoPessoa;
   });
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM0MjUwMzkwLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIyMWU1NWZiOS0zMDRjLTQ5YjEtOTM0OS05YWYwZjliMzViMDciLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.2264el5nRJGCuMhXtPuJuHUwt51kLu7K4y3HHVCu8TA');

    return this.http.get(`${this.pessoasUrl}`, { headers })
    .toPromise()
    .then(response => response.json().content);
  }

 }
