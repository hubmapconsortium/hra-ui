import { Component, Input } from '@angular/core';
import { HeaderData } from './header';
import { TableData } from './table';


@Component({
  selector: 'ccf-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})

export class TableComponent {

  @Input()
  public typeCount: TableData[] = [];

  @Input()
  displayedColumns: string[] = [];

  @Input()
  columns: HeaderData[] = [];

  @Input()
  isTotal: boolean

  getTotal(id: string) {
    return this.typeCount.reduce((acc, entry) => acc + (entry[id] as number),0);
  }

  isNumericColumn(column: string): boolean {
    return typeof this.typeCount[0]?.[column] === 'number';
  }
}
