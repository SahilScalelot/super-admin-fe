import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfflineOffersService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/shopoffer', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  getone(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopoffer/getone', {offerid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  approve(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopoffer/approve', {offerid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  disapprove(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopoffer/disapprove', {offerid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  delete(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/shopoffer/remove', {offerid: id}, this._globalFunctions.getAuthorizationHeader());
  }

}
