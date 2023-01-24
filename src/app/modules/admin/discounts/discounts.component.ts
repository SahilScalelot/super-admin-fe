import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { MediaService } from '../media.service';
import { DiscountsService } from './discounts.service';
import { Discounts } from './discounts.types';

@Component({
  selector: 'discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  // encapsulation: ViewEncapsulation.None
})
export class DiscountsComponent implements OnInit {
  
  @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;

  isLoading: boolean = false;
  isImageLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: Discounts[] = [];
  selectedProduct: Discounts;
  pagination: any = {};
  discountsForm: any;

  flashMessage: 'success' | 'error' | null = null;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _discountsService: DiscountsService,
    private _mediaService: MediaService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,

    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
    /* private _sNotify: SnotifyService, */
  ) { }

  ngOnInit(): void {
    this.getEvent();

    this._prepareItemsListForm();
  }

  getEvent(event: any = ''): void {
    this.isLoading = true;
    const page = event ? (event.page + 1) : 1;
    // this.perPageLimit = event ? (event.rows) : this.perPageLimit;
    // this.offset = ((this.perPageLimit * page) - this.perPageLimit) + 1;
    const filter: any = {
      page: page || '1',
      limit: event?.rows || '10',
      search: "",
      sortfield: "_id",
      sortoption: "-1"
    };
    this._discountsService.getList(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // this.paging = result.Data;
        this.products = result.Data.docs;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isLoading = false;
    });
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  toggleDetails(item: any = {}): void {
    // If the product is already selected...
    if (this.selectedProduct && this.selectedProduct.discountid === item.discountid) {
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

  updateSelectedProduct(discountId: any = ''): void {
    // if (this.discountsForm.invalid) {
    //   Object.keys(this.discountsForm.controls).forEach((key) => {
    //     this.discountsForm.controls[key].touched = true;
    //     this.discountsForm.controls[key].markAsDirty();
    //   });
    //   return;
    // }

    const preparedItemsObj: any = this.prepareItemsObj(this.discountsForm.value, discountId);
    this._discountsService.createAndUpdate(preparedItemsObj).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.showFlashMessage('success');
        // this.products = result.Data.docs;
        const index = (discountId == '') ? 0 : this.products.findIndex((item: any) => item._id === discountId);
        console.log(index);
        console.log(this.products);
        
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
        const product = this.discountsForm.getRawValue();
        const index = this.products.findIndex((item: any) => item.id === product.discountid);
        console.log(index);
        

        if (id != '' && index != -1) {
          console.log('in');
          this.products.splice(index, 1);
          // Delete the product on the server
          this._discountsService.delete(product.discountid).subscribe(() => {
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

  newAddItems(): void {
    // Generate a new product
    const newProduct: Discounts = {
      discountid    : '',
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

  prepareItemsObj(shopObj: any, discountid: any): any {
    const preparedShopObj: any = this._globalFunctions.copyObject(shopObj);
    preparedShopObj.discountid = discountid;
    return preparedShopObj;
  }

  private _prepareItemsListForm(itemsListObj: any = {}): void {
    this.discountsForm = this._formBuilder.group({
      discountid    : [itemsListObj?.discountid || ''],
      discountname  : [itemsListObj?.discountname || '', [Validators.required]],
      discounttype  : [itemsListObj?.discounttype || '', [Validators.required]],
      description   : [itemsListObj?.description || '', [Validators.required]],
      discount      : [itemsListObj?.discount || '', [Validators.required]],
      status        : [itemsListObj?.status || false],
      tandc         : [itemsListObj?.tandc || '', [Validators.required]],
    });
  }

}
