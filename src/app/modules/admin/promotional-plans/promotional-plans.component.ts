import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { PromotionalPlansService } from './promotional-plans.service';
import { Discounts } from './promotional-plans.types';
import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'promotional-plans',
  templateUrl: './promotional-plans.component.html',
  styleUrls: ['./promotional-plans.component.scss'],
  animations: fuseAnimations,
})
export class PromotionalPlansComponent implements OnInit {

  isLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: Discounts[] = [];
  selectedProduct: Discounts;
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
    private _promotionalPlansService: PromotionalPlansService,
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

  updateSelectedProduct(planid: any = ''): void {
    if (this.discountsForm.invalid) {
      Object.keys(this.discountsForm.controls).forEach((key) => {
        this.discountsForm.controls[key].touched = true;
        this.discountsForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.discountsForm.value, planid);
    this._promotionalPlansService.createAndUpdate(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        const index = (planid == '') ? 0 : this.products.findIndex((item: any) => item._id === planid);        
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
        const index = this.products.findIndex((item: any) => item.id === product.planid);
        if (product.planid != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._promotionalPlansService.delete(product.planid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (product.planid == '') {
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
    const newProduct: Discounts = {
      _id                  : '',
      planname             : '',
      description          : '',
      notification_amount  : '',
      sms_amount           : '',
      email_amount         : '',
      combo_amount         : '',
      total_users          : '',
      status               : false,
    };
    this.products.unshift(newProduct);
    this.toggleDetails(newProduct);
  }

  prepareItemsObj(shopObj: any, itemsId: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.planid = itemsId;
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.discountsForm = this._formBuilder.group({
      planid              : [itemsListObj?._id || ''],
      planname            : [itemsListObj?.planname || '', [Validators.required]],
      description         : [itemsListObj?.description || '', [Validators.required]],
      notification_amount : [itemsListObj?.notification_amount || '', [Validators.required]],
      sms_amount          : [itemsListObj?.sms_amount || '', [Validators.required]],
      email_amount        : [itemsListObj?.email_amount || '', [Validators.required]],
      combo_amount        : [itemsListObj?.combo_amount || '', [Validators.required]],
      total_users         : [itemsListObj?.total_users || '', [Validators.required]],
      status              : [itemsListObj?.status || false],
    });
  }

}