import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SeatingItemsComponent } from 'app/modules/admin/seating-items/seating-items.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FuseConfirmationModule } from '@fuse/services/confirmation';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/shared/shared.module';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DiscountsComponent } from './discounts/discounts.component';

const routes: Route[] = [
  {
    path: 'items',
    component: SeatingItemsComponent
  },{
    path: 'discounts',
    component: DiscountsComponent
  }
];

@NgModule({
  declarations: [
    SeatingItemsComponent,
    DiscountsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    FuseConfirmationModule,
    MatIconModule,

    MatSlideToggleModule,
    SharedModule,
    MatSortModule,
    MatButtonModule
  ]
})
export class AdminModule { }