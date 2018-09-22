import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { PessoaCadastroComponent } from './pessoas/pessoa-cadastro/pessoa-cadastro.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './formularios/form/form.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {DataTableModule} from 'primeng/datatable';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';

const routes: Routes = [
{ path: 'lancamentos/novo', component: LancamentoCadastroComponent },
{ path: 'lancamentos/:codigo', component: LancamentoCadastroComponent },
{ path: 'lancamentos', component: LancamentosPesquisaComponent },
{ path: 'pessoas/novo', component: PessoaCadastroComponent },
{ path: 'pessoas', component: PessoasPesquisaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
  ],
  imports: [
BrowserModule,
    AlertModule.forRoot(),
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

    CoreModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    LancamentosModule,
    PessoasModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
