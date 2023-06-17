import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FCoinService } from '../f-coin.service';

@Component({
  selector: 'coinsin',
  templateUrl: './coinsin.component.html',
  styleUrls: ['./coinsin.component.scss'],
  animations: fuseAnimations,
})
export class CoinsInComponent implements OnInit {

  isLoading: boolean = false;
  isCoinBalanceLoading: boolean = false;
  isCoinsInLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  coinsInList: any = [];
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
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.filterObj = {
      page: '1',
      limit: '10',
      search: "",
      sortfield: "_id",
      sortoption: "-1",
    };
    this.getCoinsIn();
  }

  getCoinsIn(): void {
    this.isCoinsInLoading = true;
    this._discountsService.getCoinsIn(this.filterObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.coinsInList = result.Data.docs;
        const pagination: any = this._globalFunctions.copyObject(result.Data);
        delete pagination.docs;
        this.pagination = pagination;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isCoinsInLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isCoinsInLoading = false;
    });
  }

  sortField(event: any = ''): void {
    this.filterObj.sortfield = event?.active || "_id";
    this.filterObj.sortoption = event?.direction || "-1";
    this.getCoinsIn();
  }

  paginate(event: any): void {
    const page = event ? (event.pageIndex + 1) : 1;
    this.filterObj.page = page || '1';
    this.filterObj.limit = event?.pageSize || '10';
    this.getCoinsIn();
  }
  
  closeDetails(): void {
    this.selectedProduct = null;
  }

  toggleDetails(item: any = {}): void {
    // If the product is already selected...
    const tmpSelectedProduct: any = this._globalFunctions.copyObject(this.selectedProduct || {});
    if (tmpSelectedProduct && tmpSelectedProduct._id === item._id) {
      this.closeDetails();
      return;
    }
    this.selectedProduct = item;
  }

  showFlashMessage(type: 'success' | 'error'): void {
    // Show the message
    this.flashMessage = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 seconds
    setTimeout(() => {
      this.flashMessage = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

}