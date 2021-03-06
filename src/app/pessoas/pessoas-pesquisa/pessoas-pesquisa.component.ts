import { Title } from '@angular/platform-browser';
import { Component, ViewChild, OnInit } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService, PessoaFiltro } from '../pessoa.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private title: Title
    ) {}

    ngOnInit(): void {
      this.title.setTitle('Pesquisa de Pessoas');
    }
 pesquisar(pagina = 0) {
   this.filtro.pagina = pagina;

   this.pessoaService.pesquisar(this.filtro)
   .then(resultado => {
     this.totalRegistros = resultado.total;
     this.pessoas = resultado.pessoas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certezas qu deseja excluir este item?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
   this.pessoaService.excluir(pessoa.codigo)
   .then(() => {
     if (this.grid.first === 0) {
       this.pesquisar();
     } else {
       this.grid.first = 0;
     }
       this.toasty.success(`${pessoa.nome} excluído com sucesso!`);
   })
   .catch(erro => this.errorHandler.handle(erro));

   }

   aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
   }

   alternarStatus(pessoa: any): void {
     const novoStatus = !pessoa.ativo;

     this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
       .then(() => {
         const acao = novoStatus ? 'ativada' : 'desativada';

         pessoa.ativo = novoStatus;
         this.toasty.success(`${pessoa.nome} ${acao} com sucesso`);

       })
       .catch(erro => this.errorHandler.handle(erro));
   }

  /* listarTodas() {
   this.pessoaService.listarTodas()
   .then(pessoas => this.pessoas = pessoas);
  } */

}
