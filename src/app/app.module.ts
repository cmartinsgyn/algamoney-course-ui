import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './formularios/form/form.component';
import { FormsModule } from '@angular/forms';

import { ToastyModule } from 'ng2-toasty';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {DataTableModule} from 'primeng/datatable';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { LancamentoService } from './lancamentos/lancamento.service';
import { PessoaService } from './pessoas/pessoa.service';


import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ToastyModule.forRoot(),

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputTextareaModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    ConfirmDialogModule,

    LancamentosModule,
    PessoasModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
