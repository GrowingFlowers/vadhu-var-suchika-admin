import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';

export interface TableColumn {
  key: string;
  displayName: string;
  pipe?: string;
  
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,CommonModule,MatButtonModule,MatPaginator],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent  implements AfterViewInit{

  public tableDataSource = new MatTableDataSource<any>(); 
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


}



