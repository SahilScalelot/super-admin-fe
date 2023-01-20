import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { SeatingItemsService } from './seating-items.service';

export interface PeriodicElement {
  itemImages: string;
  itemsName: string;
  description: string;
  status: boolean;
  editAndDelete: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { itemImages: 'sdfdf', itemsName: 'Hydrogen', description: 'sdfsdfs dfsdf ', status: true, editAndDelete: '' },
];

@Component({
  selector: 'app-seating-items',
  templateUrl: './seating-items.component.html',
  styleUrls: ['./seating-items.component.scss']
})
export class SeatingItemsComponent implements OnInit {

  displayedColumns: string[] = ['itemImages', 'itemsName', 'description', 'status', 'editAndDelete'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  isLoading: boolean = false;
  seatingItems: any;

  constants: any = CONSTANTS;
  length: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  pageSizeOptions = [10, 20, 50];
  showFirstLastButtons = true;

  constructor(
    public _globalFunctions: GlobalFunctions,
    // public _router: Router,
    // private _sNotify: SnotifyService,
    private _seatingItemsService: SeatingItemsService,
    private _fuseConfirmationService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getSeatingItems();
  }

  getSeatingItems(): void {
    const pagination: any = {
      page: this.pageIndex + 1,
      limit: this.pageSize,
      search: "",
      sortfield: "itemname",
      sortoption: "asc"
    }
    this.isLoading = true;
    this._seatingItemsService.getSeatingItems(pagination).subscribe((result: any) => {
      if (result && result.IsSuccess) {
        // this.seatingItems = result?.Data?.docs || [];
        this.seatingItems = new MatTableDataSource(result?.Data?.docs || []);

        this.length = result?.Data?.totalDocs || 0;
        this.pageSize = result?.Data?.limit || 10;
        this.pageIndex = result?.Data?.page - 1 || 0;
        this.isLoading = false;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
    });
  }

  deleteItem(itemId: string = ''): void {
    // this.isLoading = true;
    // this._seatingItemsService.deleteSeatingItems(itemId).subscribe((result: any) => {
    //   if (result && result.IsSuccess) {
    //     console.log(result?.Message);
    //     this.getSeatingItems();
    //     this.isLoading = false;
    //   } else {
    //     this._globalFunctions.successErrorHandling(result, this, true);
    //   }
    // }, (error: any) => {
    //   this._globalFunctions.errorHanding(error, this, true);
    // });
  }
  openConfirmationDialog(): void {
    // Open the confirmation and save the reference
    const dialogRef = this._fuseConfirmationService.open({});

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
        console.log(result);
    });
  }

  handlePageEvent(event: any) {
    const pageObj = this._globalFunctions.copyObject(event);
    this.pageSize = pageObj?.pageSize;
    this.pageIndex = pageObj?.pageIndex;
    this.getSeatingItems();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    this.seatingItems.filter = filterValue.trim().toLowerCase();
  }

}
