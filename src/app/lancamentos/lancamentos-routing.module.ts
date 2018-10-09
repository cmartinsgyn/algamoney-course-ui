import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
    { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
    { path: 'lancamentos', component: LancamentosPesquisaComponent },

    ];

    @NgModule({
        imports: [
          RouterModule.forChild(routes)
        ],
        exports: [RouterModule]
      })
      export class LancamentosRoutingModule { }
