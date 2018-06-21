import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import {DealersService} from '../../../@core/data/dealers.service';
import { Dealer } from '../../../models/dealer.model';
import { ServerDataSource } from 'ng2-smart-table';
import { Globals } from '../../../../Globals';
import { NbAuthService } from '@nebular/auth';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss']
})
export class DealerListComponent implements OnInit {
  data: Dealer [] = [];
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      fullName: {
        title: 'Full Name',
      },
      cnicNo: {
        title: 'CNIC No',
      },
      dArea: {
        title: 'Designated Area',
      },
      packagewsp: {
        title: 'Wholesale Price',

      },
      packagerp: {
        title: 'Retail Price',

      },

    },
    actions: {
      add: false,
      edit: false
      },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  constructor(private service: DealersService ,
    private router: Router,
    private datePipe: DatePipe ,
    private http: HttpClient ,
    private globals: Globals ,
    private toastr: ToastrService,
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
      { endPoint: globals.weburl + '/dealers' + '?access_token=' + this.token,
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
      this.service.deleteDealer(event.data.id)
        .subscribe(data1 => {
          this.toastr.success('Deleted Successfully')
        },
      error => {
        this.toastr.error('Deletion Error')
      });

    } else {
      event.confirm.reject();
    }
  }
  public onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['/pages/dealers/showDealer', event.data.id]);
  }

}
