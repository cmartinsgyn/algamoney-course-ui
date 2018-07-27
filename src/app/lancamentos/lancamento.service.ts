import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import * as moment from 'moment';
export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const params = new URLSearchParams();
      const headers = new Headers();

      // tslint:disable-next-line:max-line-length
      headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTMyNzI1Nzg3LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJmNGU0MDVjYy1kZTcxLTQ1NmItOGQ1YS04NTMyZGViNDVhODQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.2N98R7AhxcSa-Zl0bnk0hYrxlEvgdBZWctLTIYiIzVI');

      if (filtro.descricao) {
        params.set('descricao', filtro.descricao);
      }

      if (filtro.dataVencimentoInicio) {
        params.set('dataVencimentoDe',
         moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
      }

      if (filtro.dataVencimentoFim) {
        params.set('dataVencimentoAte',
         moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
      }

      return this.http.get(`${this.lancamentosUrl}?resumo`,
      { headers, search: params })
      .toPromise()
      .then(response => response.json().content);

  }
}
