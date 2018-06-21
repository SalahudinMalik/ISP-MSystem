import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgProgress } from 'ngx-progressbar';
import { ActivatedRoute } from '@angular/router';
import { PackagesService } from '../../../@core/data/packages.service';
import { Package } from '../../../models/package.model';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'ngx-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit , OnDestroy {
  id: any;
  private sub: any;
  btnSave: boolean;
  public form: FormGroup;
  constructor(private fb: FormBuilder ,
    private packageService: PackagesService,
    private toastr: ToastrService,
    private ngProgress: NgProgress,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.btnSave = true;

    this.form = this.fb.group({
      packageName: [null, Validators.compose([Validators.required])],
      bDown: [null, Validators.compose([Validators.required])],
      bUp: [null, Validators.compose([Validators.required])],
      dataLimit: [null, Validators.compose([Validators.required])],
      cost: [null, Validators.compose([Validators.required])],
      btnSave: [null],

    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      console.log('this.id ' + this.id);
      if (this.id !== undefined) {
        this.packageService.getOnePackage(this.id)
        .subscribe(data => {
          this.form.patchValue({
            packageName : data.packageName ,
            bDown: data.bDown,
            bUp: data.bUp,
            dataLimit: data.dataLimit,
            cost: data.cost,
          });
         this.form.disable();
         this.btnSave = true;

         console.log('form.valid ' + this.form.valid + ' btnSave ' + this.btnSave)
        });

      }

      // In a real app: dispatch action to load the details here.
   });
    console.log('this.id ' + this.id);

  }
  onSubmit() {
    const data = {
      packageName: this.form.value.packageName,
      bDown: this.form.value.bDown,
      bUp: this.form.value.bUp,
      dataLimit: this.form.value.dataLimit,
      cost: this.form.value.cost,

    }


      this.packageService.savePackage(data)
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
