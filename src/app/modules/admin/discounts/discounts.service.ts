import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/discount', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(discountObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/discount/save', discountObj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(discountId: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/discount/remove', {discountid: discountId}, this._globalFunctions.getAuthorizationHeader());
  }

}
