import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http'
import { ServerDataSource } from 'ng2-smart-table';
import { Globals } from '../../../../Globals';
import { NbAuthService } from '@nebular/auth';
import { ToastrService } from 'ngx-toastr';
import { ComplaintsService } from '../../../@core/data/complaints.service';

@Component({
  selector: 'ngx-list-complain',
  templateUrl: './list-complain.component.html',
  styleUrls: ['./list-complain.component.scss']
})
export class ListComplainComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe ,
    private http: HttpClient ,
    private globals: Globals ,
    private packageService: ComplaintsService,
    private toastr: ToastrService,
    private authService: NbAuthService) {
      this.token = authService.getToken();
      this.token = this.token.value.token;
    // this.service.getAllCustomer()
    //   .subscribe(data1 => {
    //     this.data = data1; dsfdsfadsf
    //   });

    this.source = new ServerDataSource( http ,
      { endPoint: globals.weburl + '/complaints' + '?access_token=' + this.token,
        // pagerLimitKey: '_limit',
        // pagerPageKey: '_page',
        // sortDirKey:  '_order',
        // sortFieldKey: '_sort',
        // dataKey: 'data',
        // totalKey: 'x_total_count',
    },
    );

  }
  settings = {
    // pager : {
    //   display : true,
    //   perPage: '10',
    //   },
    columns: {
      customerId: {
        title: 'Customer ID',
        filter: true,
      },
      complaintOpenDateTime: {
        title: 'Complaint Open Date Time',
        filter: true,
      },
      complaintStatus: {
        title: 'Complaint Status',

      },
      assignedTo: {
        title: 'Assign to',

      },
      opendBy: {
        title: 'Open By',

      },
      resolvedDate: {
        title: 'Resolve Date',
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


  ngOnInit() {
  }
  public onUserRowSelect(event): void {
    console.log(event);
    this.router.navigate(['/pages/complaints/showComplain', event.data.id]);
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
      this.packageService.deleteComplaint(event.data.id)
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


}
