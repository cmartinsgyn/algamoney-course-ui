import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule , LOCALE_ID} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormComponent } from './formularios/form/form.component';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,

    CoreModule,
    LancamentosModule,
    PessoasModule,
    AppRoutingModule,
    SegurancaModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
