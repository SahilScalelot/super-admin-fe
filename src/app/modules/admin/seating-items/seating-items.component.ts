import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { Observable } from 'rxjs';
import { MediaService } from '../media.service';
import { SeatingItemsService } from './seating-items.service';
import { InventoryProduct } from './seating-items.types';

import * as _ from 'lodash';

@Component({
  selector: 'seating-items',
  templateUrl: './seating-items.component.html',
  styleUrls: ['./seating-items.component.scss'],
  animations: fuseAnimations,
})
export class SeatingItemsComponent implements OnInit {

  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

  isLoading: boolean = false;
  isImageLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: InventoryProduct[] = [];
  selectedProduct: InventoryProduct;
  selectedItemsForm: any;
  flashMessage: 'success' | 'error' | null = null;

  pagination: any = {};
  filterObj: any = {};
  results$: Observable<any>;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _seatingItemsService: SeatingItemsService,
    private _mediaService: MediaService,
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
    this._seatingItemsService.getItemsList(this.filterObj).subscribe((result: any) => {
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
    if (this.selectedProduct && this.selectedProduct._id === item._id) {
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

  uploadItemImage(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.isImageLoading = true;
      const file = event.target.files[0];
      const fileObj: any = new FormData();
      fileObj.append('file', file);
      this._mediaService.updateImage(fileObj).subscribe((result: any) => {
        if (result && result.IsSuccess) {
          this.selectedProduct.itemimage = result.Data.url;
          const itemImageFormControl = this.selectedItemsForm.get('itemimage');
          itemImageFormControl.setValue(result.Data.url);
          // this._sNotify.success(result.msg, 'Success');
          this.isImageLoading = false;
        } else {
          this._globalFunctions.successErrorHandling(result, this, true);
        }
      }, (error: any) => {
        this.isImageLoading = false;
        this._globalFunctions.errorHanding(error, this, true);
      });
    }
  }

  removeAvatar(): void {
    // Get the form control for 'avatar'
    const itemImageFormControl = this.selectedItemsForm.get('itemimage');
    // Set the avatar as null
    itemImageFormControl.setValue(null);
    // Update the contact
    this.selectedProduct.itemimage = null;
  }

  updateSelectedProduct(itemsId: any = ''): void {
    if (this.selectedItemsForm.invalid) {
      Object.keys(this.selectedItemsForm.controls).forEach((key) => {
        this.selectedItemsForm.controls[key].touched = true;
        this.selectedItemsForm.controls[key].markAsDirty();
      });
      return;
    }

    const preparedItemsObj: any = this.prepareItemsObj(this.selectedItemsForm.value, itemsId);
    this._seatingItemsService.createAndUpdateItem(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        // this.products = result.Data.docs;
        const index = (itemsId == '') ? 0 : this.products.findIndex((item: InventoryProduct) => item._id === itemsId);
        const tmpProducts: any = this._globalFunctions.copyObject(this.products);
        if (index != -1) {
          tmpProducts[index] = result?.Data;
        }
        this.products = [...this._globalFunctions.copyObject(tmpProducts)];
        this.toggleDetails(tmpProducts);
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isLoading = false;
    });
  }

  deleteSelectedProduct(id: any = ''): void {
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
        const product = this.selectedItemsForm.getRawValue();
        const index = this.products.findIndex((item: InventoryProduct) => item._id === product.itemid);

        if (id != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._seatingItemsService.deleteItem(product.itemid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (id == '') {
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
      _id: '',
      itemname: '',
      itemimage: '',
      description: '',
      status: false
    };
    this.products.unshift(newProduct);
    this.toggleDetails(newProduct);
  }

  prepareItemsObj(shopObj: any, itemsId: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.itemid = itemsId;
    preparedShopObj.itemimage = this.selectedProduct.itemimage;
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.selectedItemsForm = this._formBuilder.group({
      itemid: [itemsListObj?._id || ''],
      itemname: [itemsListObj?.itemname || '', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      itemimage: [itemsListObj?.itemimage || '', [Validators.required]],
      description: [itemsListObj?.description || '', [Validators.required]],
      status: [itemsListObj?.status || false],
    });
  }

}