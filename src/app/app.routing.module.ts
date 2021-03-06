import { FormComponent } from './formularios/form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaoAutorizadoComponent } from './core/nao-autorizado.component';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LoginFormComponent } from './seguranca/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: 'form', component: FormComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

    @NgModule({
        imports: [
          RouterModule.forRoot(routes)
        ],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }
