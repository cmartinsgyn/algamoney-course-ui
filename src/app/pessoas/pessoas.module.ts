import { SharedModule } from '../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { LancamentosModule } from '../lancamentos/lancamentos.module';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { RouterModule } from '@angular/router';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    RouterModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,

    LancamentosModule,
    SharedModule,
    PessoasRoutingModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
   exports: [

   ]
})
export class PessoasModule { }
