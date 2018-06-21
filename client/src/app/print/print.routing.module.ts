import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerPrint } from './customerprint/customerprint.component';
const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'customerprint/:id',
      component: CustomerPrint,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintModule { }
export const routedComponents = [
  CustomerPrint
];
