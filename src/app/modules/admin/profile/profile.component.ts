import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CONSTANTS } from 'app/layout/common/constants';
import { GlobalFunctions } from 'app/layout/common/global-functions';
import { ProfileService } from './profile.service';
import { Profile } from './profile.types';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { FuseValidators } from '@fuse/validators';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: fuseAnimations,
})
export class ProfileComponent implements OnInit {

  isLoading: boolean = false;
  depositStatus: boolean = false;
  constants: any = CONSTANTS;

  searchInputControl: FormControl = new FormControl();

  products: Profile[] = [];
  selectedProduct: Profile;
  profileForm: any;

  flashMessageDepositStatus: 'success' | 'error' | null = null;

  pagination: any = {};
  results$: Observable<any>;
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _globalFunctions: GlobalFunctions,
    private _changeDetectorRef: ChangeDetectorRef,
    private _fuseConfirmationService: FuseConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getDepositStatus();
  }

  getDepositStatus(): void {
    this.isLoading = true;
    this._profileService.getDepositStatus().subscribe((result: any) => {
      if (result && result.IsSuccess) {
        this.depositStatus = result?.Data?.deposite;
      } else {
        this._globalFunctions.successErrorHandling(result, this, true);
      }
      this.isLoading = false;
    }, (error: any) => {
      this._globalFunctions.errorHanding(error, this, true);
      this.isLoading = false;
    });
  }

  showFlashMessageProfile(type: 'success' | 'error'): void {
    // Show the message
    this.flashMessageDepositStatus = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 seconds
    setTimeout(() => {
      this.flashMessageDepositStatus = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }

  depositStatusOnOff(): void {
    
    // // Open the confirmation dialog
    // const confirmation = this._fuseConfirmationService.open({
    //   title: 'Delete product',
    //   message: 'Are you sure you want to remove this product? This action cannot be undone!',
    //   actions: {
    //     confirm: {
    //       label: 'Delete'
    //     }
    //   }
    // });
    // // Subscribe to the confirmation dialog closed action
    // confirmation.afterClosed().subscribe((result) => {
    //   // If the confirm button pressed...
    //   if (result === 'confirmed') {
        this._profileService.updateDepositStatus().subscribe((result: any) => {
          if (result && result.IsSuccess) {
            this.depositStatus = result?.Data?.deposite;
          } else {
            this._globalFunctions.successErrorHandling(result, this, true);
          }
          this.isLoading = false;
        }, (error: any) => {
          this._globalFunctions.errorHanding(error, this, true);
          this.isLoading = false;
        });
    //   } else {
    //     // console.log(this.depositStatus);
    //   }
    // });
  }
}