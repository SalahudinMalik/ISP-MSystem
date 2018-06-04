import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Http } from '@angular/http';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  public form: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [null, Validators.compose([Validators.required])],
      cnicNo: [null, Validators.compose([Validators.required,
        Validators.minLength(13) , Validators.maxLength(13) ,  Validators.pattern('[0-9]+')])],
      address: [null, Validators.compose([Validators.required])],
      address2: [null, Validators.compose([Validators.required])],
      packagewsp: [null, Validators.compose([Validators.required])],
      dArea: [null, Validators.compose([Validators.required])],
      packagerp: [null, Validators.compose([Validators.required])],
      graceAmount: [null, Validators.compose([Validators.required])],
      gracePeriod: [null, Validators.compose([Validators.required])],
    });

  }
  cnicFPic(event) {
    const cnicF = event.target.files[0].name;
    this.cnicFrontPic = cnicF;
    // console.log('name ' + files);
  }
  cnicBPic(event) {
    const cnicB = event.target.files[0].name;
    this.cnicBackPic = cnicB;
    // console.log('name ' + files);
  }
  docsPic(event) {
    const doc = event.target.files[0].name;
    this.docPic = doc;
    // console.log('name ' + files);
  }
  onSubmit() {
    // console.log('data : ' + )
    const data = {
      fullName: this.form.value.fullName,
      cnicNo: this.form.value.cnicNo,
      address: this.form.value.address,
      address2: this.form.value.address2,
      dArea: this.form.value.dArea == null ? 'Area1' : this.form.value.dArea,
      packagewsp: this.form.value.packagewsp,
      packagerp: this.form.value.packagerp,
      graceAmount: this.form.value.graceAmount,
      gracePeriod: this.form.value.gracePeriod,
    }
    console.log('data : ' + JSON.stringify(data));
  }

}

