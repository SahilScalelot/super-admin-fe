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
  selector: 'add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.scss'],
  animations: fuseAnimations,
})
export class FAddCoinComponent implements OnInit {

  isLoading: boolean = false;
  constants: any = CONSTANTS;

  addCoinForm: any;

  products: any;
  selectedProduct: any;

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
    private _fuseConfirmationService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.filterObj = {
      page: '1',
      limit: '10',
      search: "",
      sortfield: "_id",
      sortoption: "-1",
    };
    this.getEvent();
    this._prepareItemsListForm();
  }

  getEvent(): void {
    this.isLoading = true;
    this._discountsService.getList(this.filterObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.products = result.Data.docs;
        const pagination: any = this._globalFunctions.copyObject(result.Data);
        delete pagination.docs;
        this.pagination = pagination;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isLoading = false;
    });
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

  addCoinSubmit(discountId: any = ''): void {
    if (this.addCoinForm.invalid) {
      Object.keys(this.addCoinForm.controls).forEach((key) => {
        this.addCoinForm.controls[key].touched = true;
        this.addCoinForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.addCoinForm.value, discountId);
    this._discountsService.createAndUpdate(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        const index = (discountId == '') ? 0 : this.products.findIndex((item: any) => item._id === discountId);
        const tmpProducts: any = this._globalFunctions.copyObject(this.products);
        if (index != -1) {
          tmpProducts[index] = result?.Data;
        }
        this.products = [...this._globalFunctions.copyObject(tmpProducts)];
      } else {
        this.showFlashMessage('error');
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isLoading = false;
    });
  }

  prepareItemsObj(shopObj: any, itemsId: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.discountid = itemsId;
    preparedShopObj.discounttype = 'discount_on_total_bill';
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.addCoinForm = this._formBuilder.group({
      transactionid : [itemsListObj?._id || ''],
      chequeno      : [itemsListObj?.discountname || ''],
      bankname      : [itemsListObj?.discountname || ''],
      ifsccode      : [itemsListObj?.description || ''],
      amount        : [itemsListObj?.discount || '', [Validators.required]],
      coinamount    : [itemsListObj?.status || ''],
      description   : [itemsListObj?.tandc || ''],
      notes         : [itemsListObj?.tandc || ''],
      documentfile  : [itemsListObj?.tandc || ''],
    });
  }

}