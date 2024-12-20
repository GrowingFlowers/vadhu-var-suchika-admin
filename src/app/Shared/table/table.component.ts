import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { TableColumn } from '../../Core/Interfaces/table-column';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import {ArrayToDateConversionPipe} from '../../Core/Pipe/array-to-date-conversion.pipe'


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,MatButtonModule,MatPaginator, MatIconModule,MatCardModule,ArrayToDateConversionPipe],
  providers:[DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements  AfterViewInit{

  tableDataSource = new MatTableDataSource<any>(); 
  @Input() displayedColumns: TableColumn[] = [];
  @Input() set dataSource(data: any[]) {
    this.tableDataSource.data = data;
  }

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }

  get displayedColumnKeys() {
    return this.displayedColumns.map(column => column.key).concat('actions');
  }

  onEdit(element: any) {
    this.edit.emit(element);
  }

  onDelete(element: any) {
    this.delete.emit(element);
  }

  getNestedValue(element: any, key: string): any {
    return key.split('.').reduce((obj, prop) => obj?.[prop], element);
  }


}



