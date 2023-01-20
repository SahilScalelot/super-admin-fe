import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { ExampleService } from './example.service';
import { InventoryProduct } from './example.types';

@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  // encapsulation: ViewEncapsulation.None
})
export class ExampleComponent implements OnInit {

  isLoading: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: InventoryProduct[] = [];
  selectedProduct: InventoryProduct;
  pagination: any = {};
  /**
   * Constructor
   */
  constructor(
    private _exampleService: ExampleService,
    private _router: Router,
    private _globalFunctions: GlobalFunctions,
    /* private _sNotify: SnotifyService, */
  ) { }

  ngOnInit(): void {
    this.getEvent();
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
      sortfield: "itemname",
      sortoption: "1"
    };
    this._exampleService.getItemsList(filter).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        console.log(result.Data.docs);
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

  /**
   * Close the details
   */
  closeDetails(): void {
    this.selectedProduct = null;
  }

  /**
   * Toggle product details
   *
   * @param itemId
   */
  toggleDetails(item: any = {}): void {
    // If the product is already selected...
    if (this.selectedProduct && this.selectedProduct._id === item._id) {
      // Close the details
      this.closeDetails();
      return;
    }

    // Get the product by id
    // this._exampleService.getItemById(itemId)
    //   .subscribe((product) => {

        // Set the selected product
        this.selectedProduct = item;

        // Fill the form
        // this.selectedProductForm.patchValue(product);

        // Mark for check
        // this._changeDetectorRef.markForCheck();
      // });
  }


  /**
  * Create product
  */
  createProduct(): void {

  }
}
