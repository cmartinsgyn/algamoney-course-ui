import { Lancamento } from './../../core/model';
import { Pessoa } from '../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { ToastyService } from 'ng2-toasty';

import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ThrowStmt } from '@angular/compiler';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  estados = [{
    value: 'AC',
    label: 'Acre'
  },
       {

    value: 'AL',
    label: 'Alagoas'
  },
       {

    value: 'AM',
    label: 'Amazonas'
  },
       {

    value: 'AP',
    label: 'Amapá'
  },
       {

    value: 'BA',
    label: 'Bahia'
  },
       {

    value: 'CE',
    label: 'Ceará'
  },
       {

    value: 'DF',
    label: 'Distrito Federal'
  },
       {

    value: 'ES',
    label: 'Espírito Santo'
  },
       {

    value: 'GO',
    label: 'Goiás'
  },
       {

    value: 'MA',
    label: 'Maranhão'
  },
       {

    value: 'MG',
    label: 'Minas Gerais'
  },
       {

    value: 'MS',
    label: 'Mato Grosso do Sul'
  },
       {

    value: 'MT',
    label: 'Mato Grosso'
  },
       {

    value: 'PA',
    label: 'Pará'
  },
       {

    value: 'PB',
    label: 'Paraíba'
  },
       {

    value: 'PE',
    label: 'Pernambuco'
  },
       {

    value: 'PI',
    label: 'Piauí'
  },
       {

    value: 'PR',
    label: 'Paraná'
  },
       {

    value: 'RJ',
    label: 'Rio de Janeiro'
  },
       {

    value: 'RN',
    label: 'Rio Grande do Norte'
  },
       {

    value: 'RO',
    label: 'Rondônia'
  },
       {

    value: 'RR',
    label: 'Roraima'
  },
       {

    value: 'RS',
    label: 'Rio Grande do Sul'
  },
       {

    value: 'SC',
    label: 'Santa Catarina'
  },
       {

    value: 'SE',
    label: 'Sergipe'
  },
       {

    value: 'SP',
    label: 'São Paulo'
  },
       {

    value: 'TO',
    label: 'Tocantins'}
  ];

  pessoa = new Pessoa();

  constructor(
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title

 ) { }

 ngOnInit(): void {
  const codigoPessoa = this.route.snapshot.params['codigo'];
  if (codigoPessoa) {
    this.title.setTitle('Nova Pessoa');
  }

  if (codigoPessoa) {
    this.carregarPessoa(codigoPessoa);
  }
}

get editando() {
 return Boolean(this.pessoa.codigo);
}

carregarPessoa(codigo: number) {
  this.pessoaService.buscarPorCodigo(codigo)
   .then(pessoa => {
   this.pessoa = pessoa;
   this.atualizarTituloEdicao();
   })
   .catch(erro => this.errorHandler.handle(erro));
}

  salvar(form: NgForm) {
    this.pessoaService.adicionar(this.pessoa)
    .then((pessoaAdicionada) => {
      this.toastyService.success('Lançamento salvo com sucesso!');

      if (!this.editando) {
      this.router.navigate(['pessoas', pessoaAdicionada.codigo]);
      } else {
        this.atualizarTituloEdicao();
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(() => {
       this.pessoa = new Pessoa();
    }, 1);
    this.router.navigate(['pessoas/novo']);
  }

  atualizarTituloEdicao() {
   this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

}
