import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FCoinService } from '../f-coin.service';

@Component({
  selector: 'coinsout',
  templateUrl: './coinsout.component.html',
  styleUrls: ['./coinsout.component.scss'],
  animations: fuseAnimations,
})
export class CoinsOutComponent implements OnInit {

  isLoading: boolean = false;
  isCoinBalanceLoading: boolean = false;
  isCoinsOutLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  coinsOutList: any = [];
  selectedProduct: any = "";

  flashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
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
    this.getCoinsOut();
  }

  getCoinsOut(): void {
    this.isCoinsOutLoading = true;
    this._discountsService.getCoinsOut(this.filterObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.coinsOutList = result.Data.docs;
        const pagination: any = this._globalFunctions.copyObject(result.Data);
        delete pagination.docs;
        this.pagination = pagination;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isCoinsOutLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isCoinsOutLoading = false;
    });
  }

  sortField(event: any = ''): void {
    this.filterObj.sortfield = event?.active || "_id";
    this.filterObj.sortoption = event?.direction || "-1";
    this.getCoinsOut();
  }

  paginate(event: any): void {
    const page = event ? (event.pageIndex + 1) : 1;
    this.filterObj.page = page || '1';
    this.filterObj.limit = event?.pageSize || '10';
    this.getCoinsOut();
  }
  
  closeDetails(): void {
    this.selectedProduct = null;
  }

  toggleDetails(item: any = {}): void {
    const tmpSelectedProduct: any = this._globalFunctions.copyObject(this.selectedProduct || {});
    if (tmpSelectedProduct && tmpSelectedProduct._id === item._id) {
      this.closeDetails();
      return;
    }
    this.selectedProduct = item;
  }

  showFlashMessage(type: 'success' | 'error'): void {
    this.flashMessage = type;
    this._changeDetectorRef.markForCheck();
    setTimeout(() => {
      this.flashMessage = null;
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

}