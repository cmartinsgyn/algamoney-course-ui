import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule, BsDropdownModule } from 'ngx-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './formularios/form/form.component';
import { FormsModule } from '@angular/forms';

import { CurrencyMaskModule } from 'ng2-currency-mask';

import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import {TooltipModule} from 'primeng/components/tooltip/tooltip';
import {DataTableModule} from 'primeng/datatable';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpModule } from '@angular/http';
import { LancamentoService } from './lancamentos/lancamento.service';

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
  providers: [LancamentoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
