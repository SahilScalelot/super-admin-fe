import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  symbol1: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', symbol1: ''},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', symbol1: ''},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', symbol1: ''},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', symbol1: ''},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', symbol1: ''},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', symbol1: ''},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', symbol1: ''},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', symbol1: ''},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', symbol1: ''},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', symbol1: ''},
];

@Component({
  selector: 'app-seating-items',
  templateUrl: './seating-items.component.html',
  styleUrls: ['./seating-items.component.scss']
})
export class SeatingItemsComponent implements OnInit {
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbol1'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);  

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
