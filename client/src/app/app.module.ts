/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { NB_AUTH_TOKEN_CLASS, NbAuthJWTToken } from '@nebular/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth.guard';
import { Globals } from '../Globals';
import { NbEmailPassAuthProvider, NbAuthModule } from '@nebular/auth';
import { ToastrModule } from 'ngx-toastr';
import { PrinttModule } from './print/print.module';
import { CustomersModule } from './pages/customers/customers.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PrinttModule,
    CustomersModule,
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    NbAuthModule.forRoot({
      providers: {
        email: {
          service: NbEmailPassAuthProvider,
          config: {
            baseEndpoint: 'http://localhost:3000/api',
            token: {
              key: 'id',
            },
            login: {
                endpoint: '/Users/login',
                method: 'post',
                redirect: {
                  success: '/pages',
                  failure: null,
                },
              defaultErrors: ['Login/Email combination is not correct, please try again.'],
              defaultMessages: ['You have been successfully logged in.'],

              },
              register: {
                endpoint: '/auth/sign-up',
                method: 'post',
              },
              logout: {
                endpoint: '/Users/logout',
                method: 'post',
                redirect: {
                  success: '/auth/login',
                  failure: null,
                },
                },
                requestPass: {
                  endpoint: '/auth/request-pass',
                  method: 'post',
                },
                resetPass: {
                  endpoint: '/auth/reset-pass',
                  method: 'post',
                },
            },
        },
      },
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuard,
    Globals,
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
})
export class AppModule {
}
