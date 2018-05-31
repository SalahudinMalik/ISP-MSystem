import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import {DealersService} from '../../../@core/data/dealers.service';
import { Dealer } from '../../../models/dealer.model';
import { ServerDataSource } from 'ng2-smart-table';
import { Globals } from '../../../../Globals';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
})
export class DealerComponent implements OnInit {
  data: Dealer [] = [];
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      cName: {
        title: 'Name',
      },
      balance: {
        title: 'Balance',
        filterFunction(cell?: any, search?: string): boolean {
          const first = search.charAt(0);
          if (first === '>') {
            search = search.replace('>' , '');
            if (cell >= search || search === '') {
              return true;
            } else {
              return false;
            }
          }
          else if (first === '<') {
            search = search.replace('<' , '');
            if (cell <= search || search === '') {
              return true;
            } else {
              return false;
            }
          }
          else if (first === '=') {
            search = search.replace('=' , '');
            if (cell === search || search === '') {
              return true;
            } else {
              return false;
            }
          }
          else {
            return true;
          }
        },
        // filter: {
        //   type: 'list',
        //   config: {
        //     selectText: 'Select...',
        //     list: [
        //       { value: 'Glenna Reichert', title: 'Glenna Reichert' },
        //       { value: 'Kurtis Weissnat', title: 'Kurtis Weissnat' },
        //       { value: 'Chelsey Dietrich', title: 'Chelsey Dietrich' }
        //     ]
        //   }
        // }
      },
      dateOfBirth: {
        title: 'Date Of Birth',
        valuePrepareFunction: (date) => {
          const raw = new Date(date);
          const formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted ;
        },
         filter: {
          type: 'date',
          config: {
          },
        },
      },
      cType: {
        title: 'Type',
        valuePrepareFunction: (value) => {
          return value === true ? 'Active' : 'Inactive'
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  constructor(private service: DealersService ,
    private router: Router,
    private datePipe: DatePipe ,
    private http: Http ,
    private globals: Globals ,
    private authService: NbAuthService) {
      this.token = authService.getToken();
      this.token = this.token.value.token;
    // this.service.getAllCustomer()
    //   .subscribe(data1 => {
    //     this.data = data1;
    //   });
    // const jsonObj: any = JSON.stringify({data: this.data , total: 13 });
    // const jObj: any = JSON.parse(jsonObj);
    this.source = new ServerDataSource( http ,
      { endPoint: globals.weburl + '/customers' + '?access_token=' + this.token,
        // pagerLimitKey: '_limit',
        // pagerPageKey: '_page',
        // sortDirKey:  '_order',
        // sortFieldKey: '_sort',
        // dataKey: 'data',
        // totalKey: 'x_total_count',
    },
    );
    // this.source.setPaging(2, 2 , true);

  }
  ngOnInit() {

  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
