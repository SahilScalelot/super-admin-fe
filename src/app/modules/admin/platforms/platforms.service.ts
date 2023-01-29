import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/platform', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdate(platformObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/platform/save', platformObj, this._globalFunctions.getAuthorizationHeader());
  }

  delete(platformid: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/platform/remove', {platformid: platformid}, this._globalFunctions.getAuthorizationHeader());
  }

  // liveMultipleEvents(eventIds: any = []): any {
  //   return this.http.post(environment.appURL + 'organizer/events/livemulti', {eventids: eventIds}, this._globalFunctions.getAuthorizationHeader());
  // }
}
