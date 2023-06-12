import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getDepositStatus(): any {
    return this.http.get(environment.appURL + 'superadmin/setting/deposite', this._globalFunctions.getAuthorizationHeader());
  }

  updateDepositStatus(depositStatus: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/setting/deposite', depositStatus, this._globalFunctions.getAuthorizationHeader());
  }

}
