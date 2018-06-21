import { Injectable } from '@angular/core';
import { Globals } from '../../../Globals';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
    private global: Globals,
    private http: HttpClient,
    private authService: NbAuthService,
  ) {
    this.token = authService.getToken();
    this.token = this.token.value.token;
  }
  saveDealer(data: any): Observable<any> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/dealers' + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.post(this.fullurl, data, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deleteDealer(data: any): Observable<any> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/dealers/' + data + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.delete(this.fullurl, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOneDealer(data: any): Observable<Dealer> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/dealers/' + data + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.get<Dealer>(this.fullurl, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
