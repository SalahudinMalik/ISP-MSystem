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
import { CustomersService } from '../../../@core/data/customers.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteComponent } from './delete.component';

@Component({
  selector: 'ngx-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private http: HttpClient,
    private globals: Globals,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private authService: NbAuthService) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
    // this.service.getAllCustomer()
    //   .subscribe(data1 => {
    //     this.data = data1; dsfdsfadsf
    //   });

    this.source = new ServerDataSource(http,
      {
        endPoint: globals.weburl + '/customers' + '?access_token=' + this.token,
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
      firstName: {
        title: 'First Name',
      },
      cnicNo: {
        title: 'CNIC No',
      },
      mobileNo: {
        title: 'Mobile No',
      },
      email: {
        title: 'Email',

      },
      package: {
        title: 'Package',
      },
    },
    actions: {
      add: false,
      edit: false,
      custom: [{ name: 'print', title: `<i class="fa fa-print"></i>` },
      ],
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
    this.router.navigate(['/pages/customers/showCustomer', event.data.id]);
  }
  onDeleteConfirm(event): void {
    // if (window.confirm('Are you sure you want to delete?')) {
    //   event.confirm.resolve();
    //   this.customersService.deleteCustomer(event.data.id)
    //     .subscribe(data1 => {
    //       this.toastr.success('Deleted Successfully')
    //     },
    //   error => {
    //     this.toastr.error('Deletion Error')
    //   });

    // } else {
    //   event.confirm.reject();
    // }
    console.log('user ' + event.data.firstName);
    const activeModal = this.modalService.open(DeleteComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Delete';
    activeModal.componentInstance.modalContent = event.data.firstName;
    activeModal.componentInstance.modalUCnic = event.data.cnicNo;
    activeModal.componentInstance.modalU_ID = event.data.id;
    activeModal.componentInstance.modalSrc = this.source;
  }
  public refresh(): void {
    this.source.refresh();
    console.log('refresh ');
  }

  print(event): void {
    this.router.navigate(['print/customerprint', event.data.id]);
  }
}
