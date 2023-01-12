import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { SeatingItemsComponent } from 'app/modules/admin/seating-items/seating-items.component';

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
    CommonModule
  ]
})
export class AdminModule { }
