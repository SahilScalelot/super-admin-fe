import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventCategoriesService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/eventcategories', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(eventcategoriesObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/eventcategories/save', eventcategoriesObj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(categoryid: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/eventcategories/remove', {categoryid: categoryid}, this._globalFunctions.getAuthorizationHeader());
  }

}
