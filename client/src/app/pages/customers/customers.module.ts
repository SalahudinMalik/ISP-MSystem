import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomersRoutingModule , routedComponents} from './customers-routing.module';
import { CustomerComponent } from './customer/customer.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [...routedComponents, CustomersListComponent],
})
export class CustomersModule { }
