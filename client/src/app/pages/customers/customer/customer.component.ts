import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Customer } from '../../../models/customer.model';
import { CustomValidationService } from './customValidationService';

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  formObj: Customer;
  public form: FormGroup;
  public formm: FormGroup;
  constructor(private fb: FormBuilder) {
    // this.formObj = new Customer();
  }
  // fnControl: FormControl;
  // lnControl: FormControl;
  // cnicControl: FormControl;

  ngOnInit() {
    // this.lnControl = this.fb.control('', Validators.compose([Validators.required]));
    // this.fnControl = this.fb.control('', Validators.compose([Validators.required]));
    // this.cnicControl =  this.fb.control();
    // this.formObj.firstName = 'mlaik';
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      cnicNo: [null, Validators.compose([Validators.required,
        Validators.minLength(13) , Validators.maxLength(13) ,  Validators.pattern('[0-9]+')])],
      email: [null, Validators.compose([Validators.email, Validators.required])],
      mobileNo: [null, Validators.compose([Validators.required ,
        Validators.pattern('[0-9]+') , Validators.minLength(11) , Validators.maxLength(11)])],
     //   CustomValidationService.checkLimit(10000000000, 99999999999)])],
      address: [null, Validators.compose([Validators.required])],
      package: [null],
      routerOf: [null],
      routerBrand: [null],
      routerModel: [null],
      routerPrice: [null],
      dropWireOf: [null],
      dropWireLength: [null],
      dropWirePricePL: [null],
      // discription: [null, Validators.compose([Validators.required])],
      // expense: [null, Validators.compose([Validators.required])],
      // receipt: [null, Validators.compose([Validators.required])]
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
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      cnicNo: this.form.value.cnicNo,
      mobileNo: this.form.value.mobileNo,
      email: this.form.value.email,
      address: this.form.value.address,
      package: this.form.value.package == null ? 'Super' : this.form.value.package,
      routerOf: this.form.value.routerOf == null ? 'Company' : this.form.value.routerOf,
      routerBrand: this.form.value.routerBrand == null ? 'Cisco' : this.form.value.routerBrand ,
      routerModel: this.form.value.routerModel == null ? 'R28' : this.form.value.routerModel,
      routerPrice: this.form.value.routerPrice,
      dropWireOf: this.form.value.dropWireOf == null ? 'Company' : this.form.value.dropWireOf,
      dropWireLength: this.form.value.dropWireLength,
      dropWirePricePL: this.form.value.dropWirePricePL,
    }
    console.log('data : ' + JSON.stringify(data));
  }

}
