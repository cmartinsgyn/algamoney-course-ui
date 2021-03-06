import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { MoneyHttp } from './money-http';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';

// tslint:disable-next-line: deprecation
export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      {'Content-Type': 'application/json'}
    ]
  });
  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      // tslint:disable-next-line: deprecation
      deps: [AuthService, Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
