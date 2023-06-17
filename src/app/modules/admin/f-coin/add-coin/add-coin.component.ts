import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FCoinService } from '../f-coin.service';
import { Router } from '@angular/router';

declare let $: any;

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
  flashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _globalFunctions: GlobalFunctions,
    private _fCoinService: FCoinService,
    private _formBuilder: FormBuilder,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.filterObj = {
      page: '1',
      limit: '10',
      search: "",
      sortfield: "_id",
      sortoption: "-1",
    };
    this._prepareItemsListForm();
  }

  showTransactionChequeFlashMessage(type: 'success' | 'error'): void {
    // Show the message
    this.transactionChequeFlashMessage = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 seconds
    setTimeout(() => {
      this.transactionChequeFlashMessage = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 4000);
  }

  showFlashMessage(type: 'success' | 'error'): void {
    // Show the message
    this.flashMessage = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 secondsś
    setTimeout(() => {
      this.flashMessage = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

  calculateCoinAmount(): void {
    const amount = this.addCoinForm?.get('amount')?.value || 0;
    this.addCoinForm.get('coin_amount').setValue((amount || 0) * 25);
  }

  addCoinSubmit(): void {
    if (this.addCoinForm.value && this.addCoinForm.value.transaction_reference_id == "" && this.addCoinForm.value.chequeno == "") {
      console.log(this.addCoinForm.value);
      this.showTransactionChequeFlashMessage('error');
      return;
    }
    if (this.addCoinForm.invalid) {
      Object.keys(this.addCoinForm.controls).forEach((key) => {
        this.addCoinForm.controls[key].touched = true;
        this.addCoinForm.controls[key].markAsDirty();
      });
      return;
    }
    const preparedItemsObj: any = this.prepareItemsObj(this.addCoinForm.value);
    this._fCoinService.generateCoins(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        this._router.navigate(['/admin/f-coin']);
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

  prepareItemsObj(generateCoinObj: any): any {
    let coinDataObj = new FormData();
    for (const key in generateCoinObj) {
      if (key !== 'document_file') {
        coinDataObj.append(key, generateCoinObj[key]);
      }
    }

    const documentInput: any = document.getElementById('document_file');
    const documentFile = documentInput.files[0];
    if (documentFile !== undefined) {
      coinDataObj.append('file', documentFile);
    }

    return coinDataObj;
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