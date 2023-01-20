import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getItemsList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/item', filter, this._globalFunctions.getFileAuthorizationHeader());
  }
  
  getItemById(itemId: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/item/getone', {'itemid': itemId}, this._globalFunctions.getAuthorizationHeader());
  }

  // liveEventById(eventId: any = ''): any {
  //   return this.http.post(environment.appURL + 'organizer/events/liveone', {eventid: eventId}, this._globalFunctions.getAuthorizationHeader());
  // }

  // liveMultipleEvents(eventIds: any = []): any {
  //   return this.http.post(environment.appURL + 'organizer/events/livemulti', {eventids: eventIds}, this._globalFunctions.getAuthorizationHeader());
  // }
}
