import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidationService } from './customValidationService';
import { CustomersService } from '../../../@core/data/customers.service';
import { ToastrService } from 'ngx-toastr';
import { NbAuthService } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  cnicFrontPic: string;
  cnicBackPic: string;
  docPic: string;
  id: any;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  public formm: FormGroup;
  constructor(private fb: FormBuilder,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
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
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log('this.id ' + this.id);
      if (this.id !== undefined) {
        this.customersService.getOneCustomer(this.id)
        .subscribe(data => {
          this.form.patchValue({
            firstName : data.firstName ,
            lastName: data.lastName,
            cnicNo: data.cnicNo,
            email: data.email,
            mobileNo: data.mobileNo,
            address: data.address,
            package: data.package,
            routerOf: data.routerOf,
            routerBrand: data.routerBrand,
            routerModel: data.routerModel,
            routerPrice: data.routerPrice,
            dropWireOf: data.dropWireOf,
            dropWireLength: data.dropWireLength,
            dropWirePricePL: data.dropWirePricePL,
          });
         this.form.disable();
         this.btnSave = true;

         console.log('form.valid ' + this.form.valid + ' btnSave ' + this.btnSave)
        });

      }

      // In a real app: dispatch action to load the details here.
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
      routerPrice: this.form.value.routerOf === 'Customer' ? '' : this.form.value.routerPrice,
      dropWireOf: this.form.value.dropWireOf == null ? 'Company' : this.form.value.dropWireOf,
      dropWireLength: this.form.value.dropWireLength,
      dropWirePricePL: this.form.value.dropWireOf === 'Customer' ? '' : this.form.value.dropWirePricePL ,
    }
    console.log('data : ' + JSON.stringify(data));
    this.customersService.saveCustomer(data)
      .subscribe(
        data1 => {
            console.log('Data inserted')
            this.toastr.success('Data inserted successfully.');
        },
       error => {
        this.toastr.error('Data not inserted error occured.');
        }
      );
  }

}
