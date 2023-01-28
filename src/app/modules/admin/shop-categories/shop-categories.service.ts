import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopCategoriesService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/shopcategories', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(shopcategoriesObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopcategories/save', shopcategoriesObj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(categoryid: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopcategories/remove', {categoryid: categoryid}, this._globalFunctions.getAuthorizationHeader());
  }

  // liveMultipleEvents(eventIds: any = []): any {
  //   return this.http.post(environment.appURL + 'organizer/events/livemulti', {eventids: eventIds}, this._globalFunctions.getAuthorizationHeader());
  // }
}
