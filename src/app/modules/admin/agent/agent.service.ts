import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }

  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/agent', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  getOrganizer(id: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/agent/getorganiser', {agentid: id}, this._globalFunctions.getAuthorizationHeader());
  }

  export(bolb): any {
    return this.http.post(environment.appURL + 'superadmin/agent/export',bolb, this._globalFunctions.getFileAuthorizationHeader());
  }

}
