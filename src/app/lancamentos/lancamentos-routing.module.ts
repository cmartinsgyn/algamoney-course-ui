import { NgModule } from '@angular/core';
import { AuthGuard } from './../seguranca/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    { path: 'lancamentos/novo',
     component: LancamentoCadastroComponent,
     canActivate: [AuthGuard],
     data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    },
    { path: 'lancamentos/:codigo',
     component: LancamentoCadastroComponent,
     canActivate: [AuthGuard],
     data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
    },
    { path: 'lancamentos',
     component: LancamentosPesquisaComponent,
     canActivate: [AuthGuard],
     data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    }

    ];

    @NgModule({
        imports: [
          RouterModule.forChild(routes)
        ],
        exports: [RouterModule]
      })
      export class LancamentosRoutingModule { }
