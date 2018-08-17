import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { PessoaService, PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

 constructor(private pessoaService: PessoaService) {}

 pesquisar(pagina = 0) {
   this.filtro.pagina = pagina;

   this.pessoaService.pesquisar(this.filtro)
   .then(resultado => {
     this.totalRegistros = resultado.total;
     this.pessoas = resultado.pessoas;
    });
  }

  excluir(pessoa: any) {
  this.pessoaService.excluir(pessoa.codigo)
  .then(() => {
    console.log(`${pessoa.nome} excluído(a) com sucesso!`);
  });

  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  /* listarTodas() {
   this.pessoaService.listarTodas()
   .then(pessoas => this.pessoas = pessoas);
  } */

}
