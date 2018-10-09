import { Pessoa } from '../core/model';

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
  // tslint:disable-next-line:max-line-length
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM5MDU0Njc4LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI3ZjY1N2ZkMy1kODU1LTQ1ZWMtOTRlYS04NDdkYWRkNTRhNzEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.AfpXsS3sIr2TePpGDp4TONDG5H_PlMScxTiO89_mkCo';

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', this.token);

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

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', this.token);
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);

   }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    headers.append ('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
 }

// recebe token, temporariamente até impl login
  listarTodas(tokenDropDown): Promise<any> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', tokenDropDown);

    return this.http.get(`${this.pessoasUrl}`, { headers })
    .toPromise()
    .then(response => response.json().content);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl,
     JSON.stringify(pessoa), { headers})
     .toPromise()
     .then((response => response.json()));
  }

 }
