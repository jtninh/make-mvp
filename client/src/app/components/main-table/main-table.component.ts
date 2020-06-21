import { Component, Input } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent {
  private _dataSource: any;
  private origOrder: any;
  displayedColumns: string[];

  get dataSource(): any {
    return this._dataSource;
  }

  @Input()
  set dataSource(val: any) {
    if (val) {
      this._dataSource = new MatTableDataSource(val);
      this.displayedColumns = Object.keys(val[0]);
      this.origOrder = JSON.parse(JSON.stringify(val));
    }
  }

  constructor() {}

  sortData(sort: Sort) {
    if (sort.direction) {
      this.dataSource.data = this.dataSource.data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        return !isNaN(a[sort.active])
          ? this.compareNumber(
              parseInt(a[sort.active]),
              parseInt(b[sort.active]),
              isAsc
            )
          : this.compareString(
              String(a[sort.active]),
              String(b[sort.active]),
              isAsc
            );
      });
    } else {
      this.dataSource.data = JSON.parse(JSON.stringify(this.origOrder));
    }
  }

  compareNumber(a: number, b: number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareString(a: string, b: string, isAsc: boolean) {
    return (a.toLowerCase() < b.toLowerCase() ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
