import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements AfterViewInit{

  public _dataSource = new MatTableDataSource<any>(); 
  @Input() displayedColumns: string[] = [];
  @Input() set dataSource(data: any[]) {
    this._dataSource.data = data;
  }

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this._dataSource.paginator = this.paginator;
  }

  onEdit(element: any) {
    this.edit.emit(element);
  }

  onDelete(element: any) {
    this.delete.emit(element);
  }


}



