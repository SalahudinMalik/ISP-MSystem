import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { AccountsRoutingModule , routedComponents } from './accounts-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AccountsRoutingModule,
    TreeModule,
    AngularFontAwesomeModule
  ],
  declarations: [...routedComponents]
})
export class AccountsModule { }
