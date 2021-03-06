import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoriaService } from '../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from '../../core/model';
import { LancamentoService } from '../lancamento.service';
import { ToastyService } from 'ng2-toasty';
import { Title } from '@angular/platform-browser';


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
   constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarListaPessoas();
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.title.setTitle('Novo Lançamento');
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

   carregarLancamento(codigo: number) {
      this.lancamentoService.buscarPorCodigo(codigo)
       .then(lancamento => {
       this.lancamento = lancamento;
       this.atualizarTituloEdicao();
       })
       .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
   this.lancamentoService.salvar(this.lancamento)
   .then((lancamentoAdicionado) => {

    this.toastyService.success('Lançamento salvo com sucesso!');

    if (!this.editando) {
       this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    } else {
       this.atualizarTituloEdicao();
    }

   })
   .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarListaPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({  label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(() => {
      this.lancamento = new Lancamento();
        }, 1);
    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
      this.title.setTitle(`Edição Lançamento: ${this.lancamento.descricao}`);
  }
}
