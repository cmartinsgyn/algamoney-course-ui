import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' },
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();
  titulo = String;
  // tslint:disable-next-line:max-line-length
  tokenTemp = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM4NTM2MDc0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIzODZlNDdkMC1jNTYzLTRiMWMtODA2Mi04MDBkNmU0Y2QzZDMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.ZmVwJ8dHb_FfXlq8TXQcQKES6ioM9rpXB7YWy4GT6EA';

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private auth: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarListaPessoas();
    const codigoLancamento = this.route.snapshot.params['codigo'];
    // this.login();
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  login() {
    this.auth.login();
  }

  carregarLancamento(codigo: number) {
      this.lancamentoService.buscarPorCodigo(codigo)
       .then(lancamento => {
       this.lancamento = lancamento;
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
   this.lancamentoService.adicionar(this.lancamento)
   .then(() => {

    this.toastyService.success('Lançamento adicionado com sucesso!');

    form.reset();
    this.lancamento = new Lancamento();

   })
   .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas(this.tokenTemp)
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarListaPessoas() {
    return this.pessoaService.listarTodas(this.tokenTemp)
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({  label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));

  }
}
