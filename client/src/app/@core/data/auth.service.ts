import { Injectable } from '@angular/core';
import { Globals } from '../../../Globals';
import { HttpClient, HttpHeaders  , HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { DataService } from './data.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  fullurl: any = '';
  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(
    private global: Globals ,
    private http: HttpClient,
  ) { }
  getLogin(username: string, password: string): Observable<any> {
    this.fullurl = '';
    const jsonObj = JSON.stringify({email: username , password: password});

     this.fullurl = this.global.weburl + '/Users/login';

    return  this.http.post(this.fullurl, jsonObj , this._options)
    .map((result: Response) => result)
    .catch(this.errorHandler);
  }
  setUserToken(token: string): void {
    localStorage.setItem('userToken' , token);
    // console.log('token' + token);
  }
  getUserToken(): string {
    return localStorage.getItem('userToken');
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error');
  }
  public logout(): Observable<any> {
    this.fullurl = '';
    // let headers = new Headers({'Content-Type': 'application/json'});
    // let opt = { responseType: 'text' as 'text' };
     this.fullurl = this.global.weburl + '/Users/logout?access_token=' + this.getUserToken();
     return  this.http.post(this.fullurl , this._options)
      .map((result: Response) => result)
      .catch(this.errorHandler);
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('userToken');
    return token != null;
  }
  rmToken(): void {
    localStorage.removeItem('userToken');
    this.logout();
  }
}
