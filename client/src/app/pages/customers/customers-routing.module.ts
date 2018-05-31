import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [{
      path: 'customer',
      component: CustomerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }

export const routedComponents = [
  CustomerComponent,
  CustomersComponent,
  CustomersListComponent
];
