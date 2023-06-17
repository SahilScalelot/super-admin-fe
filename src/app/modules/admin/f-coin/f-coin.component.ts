import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { FCoinService } from './f-coin.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
@Component({
  selector: 'f-coin',
  templateUrl: './f-coin.component.html',
  styleUrls: ['./f-coin.component.scss'],
  animations: fuseAnimations,
})
export class FCoinComponent implements OnInit {

  isLoading: boolean = false;
  coinSwitch: boolean = true;
  isCoinBalanceLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  coinBalance: any = 0;
  selectedProduct: any = "";

  flashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _discountsService: FCoinService,
    private _globalFunctions: GlobalFunctions,
  ) { }

  ngOnInit(): void {
    this.filterObj = {
      page: '1',
      limit: '10',
      search: "",
      sortfield: "_id",
      sortoption: "-1",
    };
    this.getCoinBalance();
  }

  getCoinBalance(): void {
    this.isCoinBalanceLoading = true;
    this._discountsService.getCoinBalance().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.coinBalance = result.Data.fcoins;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isCoinBalanceLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isCoinBalanceLoading = false;
    });
  }

}