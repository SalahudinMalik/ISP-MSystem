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
import { Package } from '../../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
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
  savePackage(data: any): Observable<any> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/packages' + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.post(this.fullurl, data, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  deletePackage(data: any): Observable<any> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/packages/' + data + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.delete(this.fullurl, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  getOnePackage(data: any): Observable<Package> {
    this.fullurl = ''
    this.fullurl = this.global.weburl + '/packages/' + data + '?access_token=' + this.token;
    // this.fullurl = this.global.weburl + "auth/login";
    return this.http.get<Package>(this.fullurl, this._options)
      .map((result: any) => result)
      .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
}
