import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionalPlansService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/promotionplans', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(promotionplansObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/promotionplans/save', promotionplansObj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(categoryid: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/promotionplans/remove', {planid: categoryid}, this._globalFunctions.getAuthorizationHeader());
  }

}
