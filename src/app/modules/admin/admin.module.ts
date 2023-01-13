import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { SeatingItemsComponent } from 'app/modules/admin/seating-items/seating-items.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';


const routes: Route[] = [
  {
    path: 'example',
    component: ExampleComponent
  },
  {
    path: 'items',
    component: SeatingItemsComponent
  }
];

@NgModule({
  declarations: [
    ExampleComponent,
    SeatingItemsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatTableModule,
    MatInputModule
  ]
})
export class AdminModule { }