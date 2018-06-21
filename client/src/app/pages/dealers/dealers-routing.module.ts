import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerComponent } from './dealer/dealer.component'
import { DealersComponent } from './dealers.component';
import { DealerListComponent } from './dealer-list/dealer-list.component';

const routes: Routes = [
  {
    path: '',
    component: DealersComponent,
    children: [{
      path: 'addDealer',
      component: DealerComponent,
      },
      {
        path: 'listDealer',
        component: DealerListComponent,
      },
      {
        path: 'showDealer/:id',
        component: DealerComponent,
      }
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
  DealerListComponent,
  DealersComponent,
];
