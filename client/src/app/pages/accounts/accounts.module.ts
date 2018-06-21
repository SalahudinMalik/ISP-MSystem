import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'angular-tree-component';
import { AccountsRoutingModule , routedComponents } from './accounts-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AccountsRoutingModule,
    TreeModule
  ],
  declarations: [...routedComponents]
})
export class AccountsModule { }
