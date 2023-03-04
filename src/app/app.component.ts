import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { map, Observable } from 'rxjs';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

 // Each Column Definition results in one Column.
 public columnDefs: ColDef[] = [
   { field: 'make', checkboxSelection: this.checkBoxSelectionCallback, showDisabledCheckboxes:true},
   { field: 'model'},
   { field: 'price' }
 ];

 checkBoxSelectionCallback(param:any) {
   return false;
 }
 // DefaultColDef sets props common to all Columns
 public defaultColDef: ColDef = {
   sortable: true,
   filter: true,
 };
 
 // Data that gets displayed in the grid
 public rowData$!: Observable<any[]>;

 // For accessing the Grid's API
 @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

 constructor(private http: HttpClient) {}

 ngOnInit(): void {
  
 }

 // Example load data from sever
 onGridReady(params: GridReadyEvent) {
   this.rowData$ = this.http
     .get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
 }

 // Example of consuming Grid Event
 onCellClicked( e: CellClickedEvent): void {
   console.log('cellClicked', e);
 }

 // Example using Grid's API
 clearSelection(): void {
   this.agGrid.api.deselectAll();
 }
}