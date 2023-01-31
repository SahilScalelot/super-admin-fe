import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { NotificationCouponsService } from './notification-coupons.service';
import { InventoryProduct } from './notification-coupons.types';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'notification-coupons',
  templateUrl: './notification-coupons.component.html',
  styleUrls: ['./notification-coupons.component.scss'],
  animations: fuseAnimations,
})
export class NotificationCouponsComponent implements OnInit {

  isLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: InventoryProduct[] = [];
  selectedProduct: InventoryProduct;
  discountsForm: any;

  flashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _promotionalPlansService: NotificationCouponsService,
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

    this.search = _.debounce(this.search, 500);
  }

  getEvent(): void {
    this.isLoading = true;
    this._promotionalPlansService.getList(this.filterObj).subscribe((result: any) => {
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

  sortField(event: any = ''): void {
    this.filterObj.sortfield = event?.active || "_id";
    this.filterObj.sortoption = event?.direction || "-1";
    this.getEvent();
  }

  paginate(event: any): void {
    const page = event ? (event.pageIndex + 1) : 1;
    this.filterObj.page = page || '1';
    this.filterObj.limit = event?.pageSize || '10';
    this.getEvent();
  }

  search(event: any): void {
    this.filterObj.search = event?.target?.value || '';
    this.getEvent();
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  toggleDetails(item: any = {}): void {
    // If the product is already selected...
    const tmpSelectedProduct: any = this._globalFunctions.copyObject(this.selectedProduct || {});
    if (tmpSelectedProduct && tmpSelectedProduct._id === item._id) {
      // Close the details
      this.closeDetails();
      return;
    }
    this._prepareItemsListForm(item);
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

  updateSelectedProduct(notificationcouponid: any = ''): void {
    if (this.discountsForm.invalid) {
      Object.keys(this.discountsForm.controls).forEach((key) => {
        this.discountsForm.controls[key].touched = true;
        this.discountsForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.discountsForm.value, notificationcouponid);
    this._promotionalPlansService.createAndUpdate(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        const index = (notificationcouponid == '') ? 0 : this.products.findIndex((item: any) => item._id === notificationcouponid);        
        const tmpProducts: any = this._globalFunctions.copyObject(this.products);
        if (index != -1) {
          tmpProducts[index] = result?.Data;
        }
        this.products = [...this._globalFunctions.copyObject(tmpProducts)];
        this.toggleDetails(tmpProducts);
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

  deleteSelectedProduct(): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete product',
      message: 'Are you sure you want to remove this product? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the product object
        const product = this.discountsForm.getRawValue();
        const index = this.products.findIndex((item: any) => item.id === product.notificationcouponid);
        if (product.notificationcouponid != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._promotionalPlansService.delete(product.notificationcouponid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (product.notificationcouponid == '') {
          this.products.splice(0, 1);
        }
        this.closeDetails();
      } else {
        this.closeDetails();
      }
    });
  }

  newAddItems(): any {
    const isFirstRecordEmpty: boolean = (_.findIndex(this.products, {'_id': ''}) == 0);
    if (isFirstRecordEmpty) {
      return false;
    }
    // Generate a new product
    const newProduct: InventoryProduct = {
      _id         : "",
      code        : "",
      description : "",
      amount      : "",
      percentage  : "",
      limit       : "",
      expiry_date : "",
      expiry_time : "",
      status      : false,
    };
    this.products.unshift(newProduct);
    this.toggleDetails(newProduct);
  }

  prepareItemsObj(shopObj: any, itemsId: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.notificationcouponid = itemsId;
    preparedShopObj.expiry_date = moment(shopObj.expiry_date).format('YYYY-MM-DD');
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.discountsForm = this._formBuilder.group({
      notificationcouponid : [itemsListObj?._id         || ''],
      code                 : [itemsListObj?.code        || '', [Validators.required]],
      description          : [itemsListObj?.description || '', [Validators.required]],
      amount               : [itemsListObj?.amount      || '', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      percentage           : [itemsListObj?.percentage  || '', [Validators.max(100), Validators.min(0)]],
      limit                : [itemsListObj?.limit       || '', [Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      expiry_date          : [itemsListObj?.expiry_date || ''],
      expiry_time          : [itemsListObj?.expiry_time || ''],
      status               : [itemsListObj?.status      || false],
    });
  }

}