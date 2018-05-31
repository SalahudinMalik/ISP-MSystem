import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DealersRoutingModule , routedComponents} from './dealers-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { DealersComponent } from './dealers.component';
import { DatePipe } from '@angular/common';
import { DealersService } from '../../@core/data/dealers.service'
import {HttpClientModule, HttpClient} from '@angular/common/http';

@NgModule({
  imports: [
    ThemeModule,
    DealersRoutingModule,
    Ng2SmartTableModule,
    HttpClientModule,
  ],
  declarations: [ ...routedComponents],
  providers : [DatePipe , DealersService],
})
export class DealersModule { }
