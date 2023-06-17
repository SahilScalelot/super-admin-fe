import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FCoinService {

  constructor(private http: HttpClient,private _globalFunctions: GlobalFunctions) { }
  
  getCoinBalance(): any {
    return this.http.get(environment.appURL + 'superadmin/fcoin/coinbalance', this._globalFunctions.getFileAuthorizationHeader());
  }

  getCoinsIn(filterObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/fcoin/coinsin', filterObj, this._globalFunctions.getAuthorizationHeader());
  }

  getCoinsOut(filterObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/fcoin/coinsout', filterObj, this._globalFunctions.getAuthorizationHeader());
  }
  
  generateCoins(generateCoinsObj: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/fcoin/generatecoins', generateCoinsObj, this._globalFunctions.getFileAuthorizationHeader());
  }

  delete(discountId: any = ''): any {
    return this.http.post(environment.appURL + 'superadmin/discount/remove', {discountid: discountId}, this._globalFunctions.getAuthorizationHeader());
  }

}
