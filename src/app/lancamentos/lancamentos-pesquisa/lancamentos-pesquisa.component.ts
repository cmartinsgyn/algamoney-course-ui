import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../seguranca/auth.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private auth: AuthService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    // this.pesquisar();
    this.title.setTitle('Pesquisa de Lançamento');
  }
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
  })
  .catch(erro => this.errorHandler.handle(erro));
 }

 aoMudarPagina(event: LazyLoadEvent) {
  const pagina = event.first / event.rows;
  this.pesquisar(pagina);
 }

 confirmarExclusao(lancamento: any) {
   this.confirmation.confirm({
     message: 'Tem certezas qu deseja excluir este item?',
     accept: () => {
       this.excluir(lancamento);
     }
   });

 }

 excluir(lancamento: any) {
  this.lancamentoService.excluir(lancamento.codigo)
  .then(() => {
    if (this.grid.first === 0) {
      this.pesquisar();
    } else {
      this.grid.first = 0;
    }
      this.toasty.success(`${lancamento.descricao} de ${lancamento.pessoa} excluído com sucesso!`);
  })
  .catch(erro => this.errorHandler.handle(erro));

  }

}
