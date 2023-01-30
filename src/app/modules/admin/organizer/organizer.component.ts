import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { MediaService } from '../media.service';
import { OrganizerService } from './organizer.service';
import { InventoryProduct } from './organizer.types';

import * as _ from 'lodash';
import { Observable } from 'rxjs';

@Component({
  selector: 'organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss'],
  animations: fuseAnimations,
})
export class OrganizerComponent implements OnInit {

  isLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: any;
  selectedProduct: any;
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
    private _shopCategoriesService: OrganizerService,
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
    // this._prepareItemsListForm();

    this.search = _.debounce(this.search, 500);
  }

  getEvent(): void {
    this.isLoading = true;
    this._shopCategoriesService.getList(this.filterObj).subscribe((result: any) => {
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
    if (this.selectedProduct && this.selectedProduct.organizerid === item.organizerid) {
      // Close the details
      this.closeDetails();
      return;
    }
    // this._prepareItemsListForm(item);
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

  approve(organizerObj: any): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Approve Organizer',
      message: 'Are you sure you want to Approve this {{organizerObj.name}} organizer.',
      actions: {
        confirm: {
          label: 'Approve'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the product object
        const product = this.discountsForm.getRawValue();
        const index = this.products.findIndex((item: any) => item.id === product.organizerid);
        if (product.organizerid != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._shopCategoriesService.approve(product.organizerid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (product.organizerid == '') {
          this.products.splice(0, 1);
        }
        this.closeDetails();
      } else {
        this.closeDetails();
      }
    });
  }

  disapprove(organizerObj: any): void {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Disapprove Organizer',
      message: 'Are you sure you want to Disapprove this ' + organizerObj.name + ' organizer.',
      actions: {
        confirm: {
          label: 'Disapprove'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe((result) => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the product object
        const product = organizerObj;
        // console.log(product);
        // const index = this.products.findIndex((item: any) => item._id === product._id);
        
        this._shopCategoriesService.disapprove(product._id).subscribe(() => {
        });
        // if (product._id != '' && index != -1) {
        //   // Delete the product on the server
        // } else if (product._id == '') {
        //   this.products.splice(0, 1);
        // }
        this.closeDetails();
      } else {
        this.closeDetails();
      }
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
        const index = this.products.findIndex((item: any) => item.id === product.organizerid);
        if (product.organizerid != '' && index != -1) {
          this.products.splice(index, 1);
          // Delete the product on the server
          this._shopCategoriesService.delete(product.organizerid).subscribe(() => {
            // Close the details
            this.closeDetails();
          });
        } else if (product.organizerid == '') {
          this.products.splice(0, 1);
        }
        this.closeDetails();
      } else {
        this.closeDetails();
      }
    });
  }

  // newAddItems(): void {
  //   // Generate a new product
  //   const newProduct: InventoryProduct = {
  //     organizerid    : '',
  //     categoryname  : '',
  //     description   : '',
  //     status        : false,
  //   };
  //   this.products.unshift(newProduct);
  //   this.toggleDetails(newProduct);
  // }

  // prepareItemsObj(shopObj: any, organizerid: any): any {
  //   const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
  //   preparedShopObj.organizerid = organizerid;
  //   return preparedShopObj;
  // }

  // private _prepareItemsListForm(itemsListObj: any = {}): void {
  //   this.discountsForm = this._formBuilder.group({
  //     organizerid    : [itemsListObj?._id || ''],
  //     categoryname  : [itemsListObj?.categoryname || '', [Validators.required]],
  //     description  : [itemsListObj?.description || '', [Validators.required]],
  //     status        : [itemsListObj?.status || false],
  //   });
  // }

}