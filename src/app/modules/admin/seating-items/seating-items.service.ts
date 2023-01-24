import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeatingItemsService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getItemsList(filter: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/item', filter, this._globalFunctions.getFileAuthorizationHeader());
  }

  createAndUpdateItem(itemsObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/item/save', itemsObj, this._globalFunctions.getAuthorizationHeader());
  }

  deleteItem(itemsId: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/item/remove', {itemid: itemsId}, this._globalFunctions.getAuthorizationHeader());
  }

  // liveMultipleEvents(eventIds: any = []): any {
  //   return this.http.post(environment.appURL + 'organizer/events/livemulti', {eventids: eventIds}, this._globalFunctions.getAuthorizationHeader());
  // }
}
