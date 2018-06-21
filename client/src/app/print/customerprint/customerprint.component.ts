import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../../@core/data/customers.service';

@Component({
    selector: 'ngx-customerprint',
    templateUrl: './customerprint.component.html',
    styleUrls: ['./customerprint.component.scss']
})
export class CustomerPrint {

    id: any;
    customerdetails: any;
    constructor(
        private _Activatedroute: ActivatedRoute,
        private customersService: CustomersService,

    ) {

        _Activatedroute.params.subscribe(params => { this.id = params['id']; });

        this.customersService.getOneCustomer(this.id)
            .subscribe(data => {
                this.customerdetails = data;
            });

        setTimeout(() => {
            window.print()
        }, 1000);
    }
}
