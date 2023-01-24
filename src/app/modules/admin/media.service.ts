import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }

  // Upload Image
  updateImage(fileObj: any): any {
    return this.http.post(environment.appURL + 'superadmin/media/image', fileObj, this._globalFunctions.getFileAuthorizationHeader());
  }

  // Upload Video
  updateVideo(fileObj: any): any {
    return this.http.post(environment.appURL + 'superadmin/media/video', fileObj, this._globalFunctions.getFileAuthorizationHeader());
  }

  // Upload Banner
  updateBanner(fileObj: any): any {
    return this.http.post(environment.appURL + 'superadmin/media/banner', fileObj, this._globalFunctions.getFileAuthorizationHeader());
  }

  // Upload Document
  updateDocument(fileObj: any): any {
    return this.http.post(environment.appURL + 'superadmin/media/document', fileObj, this._globalFunctions.getFileAuthorizationHeader());
  }
}
