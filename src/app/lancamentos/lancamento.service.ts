import { Lancamento } from './../core/model';

import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  // tslint:disable-next-line:max-line-length
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM5MDkwODAwLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIxMzljMWQ4Ny1hNmIzLTQ5NjctOTA5NC0yMzVmNTFhYzlkYmQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.QhsbanH-xXbEVLPRZnydl_uthql6PQyXeiFmYdet1xM';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const params = new URLSearchParams();
      const headers = new Headers();

      // tslint:disable-next-line:max-line-length
      headers.append('Authorization', this.token);

      params.set('page', filtro.pagina.toString());
      params.set('size', filtro.itensPorPagina.toString());

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
      .then(response => {
        const responseJson = response.json();
        const lancamentos = responseJson.content;

        const resultado = {
          lancamentos,
          total: responseJson.totalElements
        };
      return resultado;
    });

  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', this.token);
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);

   }

   /*na aula tem um método separado(adicionar e alterar) mas nesse caso fiz um só por usar o hibernate*/
   salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();

     headers.append('Authorization', this.token);
     headers.append('Content-Type', 'application/json');

     return this.http.post(this.lancamentosUrl,
         JSON.stringify(lancamento), { headers })
       .toPromise()
       .then(response => response.json());
   }

  //  atualizar(lancamento: Lancamento): Promise<Lancamento> {
  //    const headers = new Headers();

  //    headers.append('Authorization', this.token);
  //    headers.append('Content-Type', 'application/json');

  //    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
  //     JSON.stringify(lancamento), { headers })
  //   .toPromise()
  //   .then(response => {
  //     const lancamentoAlterado = response.json() as Lancamento;

  //     this.converterStringsParaDatas([lancamento]);

  //     return lancamentoAlterado;

  //   });

  //  }

   buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {

    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

        if (lancamento.dataPagamento) {
      lancamento.dataPagamento = moment(lancamento.dataPagamento,
       'YYYY-MM-DD').toDate();
        }

    }
  }


}
