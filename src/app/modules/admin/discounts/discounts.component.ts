import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { DiscountsService } from './discounts.service';
import { InventoryProduct } from './discounts.types';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
  animations: fuseAnimations,
})
export class DiscountsComponent implements OnInit {

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
    private _discountsService: DiscountsService,
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

  // getEvent(event: any = ''): void {
  //   this.isLoading = true;
  //   const page = event ? (event.pageIndex + 1) : 1;
  //   const filter: any = {
  //     page: page || '1',
  //     limit: event?.pageSize || '10',
  //     search: "",
  //     sortfield: event?.active || "_id",
  //     sortoption: event?.direction || "-1",
  //   };
  //   this._discountsService.getList(filter).subscribe((result: any) => {
  //     if (result && result.IsSuccess) {
  //       this.products = result.Data.docs;
  //       const pagination: any = this._globalFunctions.copyObject(result.Data);
  //       delete pagination.docs;
  //       this.pagination = pagination;
  //     } else {
  //       this._globalFunctions.successErrorHandling(result, this, true);
  //     }
  //     this.isLoading = false;
  //   }, (error: any) => {
  //     this._globalFunctions.errorHanding(error, this, true);
  //     this.isLoading = false;
  //   });
  // }
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

  updateSelectedProduct(discountId: any = ''): void {
    if (this.discountsForm.invalid) {
      Object.keys(this.discountsForm.controls).forEach((key) => {
        this.discountsForm.controls[key].touched = true;
        this.discountsForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.discountsForm.value, discountId);
    this._discountsService.createAndUpdate(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        const index = (discountId == '') ? 0 : this.products.findIndex((item: any) => item._id === discountId);
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
        const index = this.products.findIndex((item: any) => item.id === product.discountid);
        if (product.discountid != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._discountsService.delete(product.discountid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (product.discountid == '') {
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
      _id           : '',
      discountname  : '',
      discounttype  : '',
      description   : '',
      discount      : '',
      status        : false,
      tandc         : '',
    };
    this.products.unshift(newProduct);
    this.toggleDetails(newProduct);
  }

  prepareItemsObj(shopObj: any, itemsId: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.discountid = itemsId;
    preparedShopObj.discounttype = 'discount_on_total_bill';
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.discountsForm = this._formBuilder.group({
      discountid    : [itemsListObj?._id || ''],
      discountname  : [itemsListObj?.discountname || '', [Validators.required]],
      discounttype  : [{value: itemsListObj?.discounttype || 'discount_on_total_bill', disabled: true}, [Validators.required]],
      description   : [itemsListObj?.description || '', [Validators.required]],
      discount      : [itemsListObj?.discount || '', [Validators.required]],
      status        : [itemsListObj?.status || false],
      tandc         : [itemsListObj?.tandc || '', [Validators.required]],
    });
  }

}