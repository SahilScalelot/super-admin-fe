import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationCouponsService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/notificationcoupons', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(Obj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/notificationcoupons/save', Obj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/notificationcoupons/remove', {notificationcouponid: id}, this._globalFunctions.getAuthorizationHeader());
  }

}
