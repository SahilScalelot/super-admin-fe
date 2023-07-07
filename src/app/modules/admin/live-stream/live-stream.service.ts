import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamsService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/livestream', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  getone(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/livestream/getone', {livestreamid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  approve(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/livestream/approve', {livestreamid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  disapprove(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/livestream/reject', {livestreamid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  delete(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/livestream/remove', {livestreamid: id}, this._globalFunctions.getAuthorizationHeader());
  }

}
