import { PessoaService, PessoaFiltro } from '../pessoa.service';

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
 pessoas = [];
 totalRegistros = 0;
 filtro = new PessoaFiltro;

 constructor(private pessoaService: PessoaService) {}

 ngOnInit() {
  this.listarTodas();
 }

 listarTodas() {
  this.pessoaService.listarTodas()
  .then(pessoas => this.pessoas = pessoas);
 }

 pesquisar(pagina = 0) {
  this.filtro.pagina = pagina;
  this.pessoaService.pesquisar(this.filtro)
  .then(resultado => {
    this.totalRegistros = resultado.total;
    this.pessoas = resultado;
  });
 }

 aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisar(pagina);
 }


}
