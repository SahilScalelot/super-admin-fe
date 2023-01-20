import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';
import { BehaviorSubject, forkJoin, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SeatingItemsService {
  public isOpenAddEditArrangementDialog$: BehaviorSubject<any>;

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) {
    this.isOpenAddEditArrangementDialog$ = new BehaviorSubject<any>(null);
  }

  // Add Event First Step
  getSeatingItems(itemsPaginationObj: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/item', itemsPaginationObj, this._globalFunctions.getAuthorizationHeader());
  }

  getSeatingItemsT(itemsPaginationObj: any = {}): any {
    return this.http.post(environment.appURL + 'superadmin/item/list', itemsPaginationObj, this._globalFunctions.getAuthorizationHeader());
  }
  deleteSeatingItems(itemsId: string = ''): any {
    return this.http.post(environment.appURL + 'superadmin/item/remove', {itemid: itemsId}, this._globalFunctions.getAuthorizationHeader());
  }

  // Images Api
  uploadImages(photoFormData: any): any {
    return this.http.post(environment.appURL + 'organizer/events/image', photoFormData, this._globalFunctions.getFileAuthorizationHeader());
  }
  
  // Video Api
  uploadVideos(videoFormData: any): any {
    return this.http.post(environment.appURL + 'organizer/events/video', videoFormData, this._globalFunctions.getFileAuthorizationHeader());
  }
  
  // PDF Api
  documentUpload(pdfFormData: any): any {
    return this.http.post(environment.appURL + 'organizer/events/document', pdfFormData, this._globalFunctions.getFileAuthorizationHeader());
  }

  // Delete Event
  deleteEvent(eventId: any): any {
    return this.http.post(environment.appURL + 'organizer/events/remove', {eventid: eventId}, this._globalFunctions.getAuthorizationHeader());
  }
}
