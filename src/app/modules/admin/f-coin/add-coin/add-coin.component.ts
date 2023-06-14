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

  transactionChequeFlashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _fCoinService: FCoinService,
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
    this._fCoinService.getList(this.filterObj).subscribe((result: any) => {
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

  showTransactionChequeFlashMessageFlashMessage(type: 'success' | 'error'): void {
    // Show the message
    this.transactionChequeFlashMessage = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 seconds
    setTimeout(() => {
      this.transactionChequeFlashMessage = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

  calculateCoinAmount(): void {
    const amount = this.addCoinForm?.get('amount')?.value || 0;
    this.addCoinForm.get('coin_amount').setValue((amount || 0) * 25);
  }

  addCoinSubmit(): void {
    if (this.addCoinForm.invalid) {
      if (this.addCoinForm.transaction_reference_id != "" || this.addCoinForm.chequeno != "") {
        this.showTransactionChequeFlashMessageFlashMessage('error');
      }
      Object.keys(this.addCoinForm.controls).forEach((key) => {
        this.addCoinForm.controls[key].touched = true;
        this.addCoinForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.addCoinForm.value);
    
    console.log(preparedItemsObj);
    // this._fCoinService.generateCoins(preparedItemsObj).subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     this.showFlashMessage('success');
    //     const index = (discountId == '') ? 0 : this.products.findIndex((item: any) => item._id === discountId);
    //     const tmpProducts: any = this._globalFunctions.copyObject(this.products);
    //     if (index != -1) {
    //       tmpProducts[index] = result?.Data;
    //     }
    //     this.products = [...this._globalFunctions.copyObject(tmpProducts)];
    //   } else {
    //     this.showFlashMessage('error');
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    //   this.isLoading = false;
    // }, (error: any) => {
    //   this._globalFunctions.errorHanding(error, this, true);
    //   this.isLoading = false;
    // });
  }

  prepareItemsObj(generateCoinObj: any): any {
    const preparedgenerateCoinObj: any = this._globalFunctions.copyObject(generateCoinObj);
    // document_file
    // pdfFormData.append('file', pdfUpload);

    return preparedgenerateCoinObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.addCoinForm = this._formBuilder.group({
      transaction_reference_id : [itemsListObj?.transaction_reference_id || ''],
      chequeno                 : [itemsListObj?.chequeno || ''],
      bank_name                : [itemsListObj?.bank_name || ''],
      ifsc_code                : [itemsListObj?.ifsc_code || ''],
      amount                   : [itemsListObj?.amount || '', [Validators.required]],
      coin_amount              : [itemsListObj?.coin_amount || ''],
      description              : [itemsListObj?.description || ''],
      notes                    : [itemsListObj?.notes || ''],
      document_file            : [itemsListObj?.document_file || ''],
    });
  }

}