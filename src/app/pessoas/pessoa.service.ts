import { PessoaFiltro } from './pessoa.service';
import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

// export class PessoaFiltro {
//  nome: string;
// }

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  constructor(private http: Http) { }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTMzNzg1OTc5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJhNWE1Mzg3MC00ZjQyLTRjNWEtOWUzNS04YTgyMjg1NjU0MWUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.O1gFSPqGSsaepClKT7C362I-E703ycFXiFaht9MFuJM ');

    return this.http.get(`${this.pessoasUrl}?`, { headers })
    .toPromise()
    .then(response => response.json().content);
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
  return null;
  }
  }
