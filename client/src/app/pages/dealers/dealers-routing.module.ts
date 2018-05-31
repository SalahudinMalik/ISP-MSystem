import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerComponent } from './dealer/dealer.component'
import { DealersComponent } from './dealers.component';

const routes: Routes = [
  {
    path: '',
    component: DealersComponent,
    children: [{
      path: 'dealer',
      component: DealerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealersRoutingModule { }

export const routedComponents = [
  DealerComponent,
  DealersComponent,
];