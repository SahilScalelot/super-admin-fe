import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }

  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/users', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  getOne(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/users/getone', {userid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  export(bolb): any {
    return this.http.post(environment.appURL + 'superadmin/users/export',bolb, this._globalFunctions.getFileAuthorizationHeader());
  }

}
