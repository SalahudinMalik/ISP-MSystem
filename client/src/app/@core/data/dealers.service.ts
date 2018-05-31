import { Injectable } from '@angular/core';
import { Globals } from '../../../Globals';
import { HttpClient, HttpHeaders  , HttpErrorResponse } from '@angular/common/http';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

import { Dealer } from '../../models/dealer.model';
@Injectable({
  providedIn: 'root',
})
export class DealersService {

  fullurl: any = '';
  token: any;
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(
    private global: Globals ,
    private http: HttpClient,
    private authService: NbAuthService,

  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
   }
  getAllCustomer(): Observable<Dealer[]> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/customers' + '?access_token=' + this.token ;
    // this.fullurl = this.global.weburl + "auth/login";
    return  this.http.get<Dealer>(this.fullurl)
        .map((result: any) => result)
        .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
