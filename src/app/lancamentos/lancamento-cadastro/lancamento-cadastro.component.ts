import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from '../../seguranca/auth.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';


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
  // tslint:disable-next-line:max-line-length
  tokenDropDown = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM2OTgxNDgyLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIzMjdlNzQwNi02NDAwLTQwNjAtYjIyNS1kZDY0MDJmYjdhYzYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.dpMGNGkf-BEowWb4yPR0bNgGhQfDuMqmx5kSWwMPCgM';

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarListaPessoas();
    // this.login();
  }

  login() {
    this.auth.login();
  }

  salvar(lancamentoForm: FormControl) {
    console.log(this.lancamento);

  }

  carregarCategorias() {
    return this.categoriaService.listarTodas(this.tokenDropDown)
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarListaPessoas() {
    return this.pessoaService.listarTodas(this.tokenDropDown)
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({  label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

}
