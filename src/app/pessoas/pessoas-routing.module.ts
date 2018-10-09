import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';

const routes: Routes = [
    { path: 'pessoas/novo', component: PessoaCadastroComponent },
    { path: 'pessoas/:codigo', component: PessoaCadastroComponent },
    { path: 'pessoas', component: PessoasPesquisaComponent },

    ];

    @NgModule({
        imports: [
          RouterModule.forChild(routes)
        ],
        exports: [RouterModule]
      })
      export class PessoasRoutingModule { }
