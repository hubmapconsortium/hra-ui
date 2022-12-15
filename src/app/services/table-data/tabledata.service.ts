import { Injectable } from '@angular/core';
import { TableData } from '../../components/table/table';
import { map, Observable, shareReplay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { parse, ParseResult } from 'papaparse';


export interface TableDataWithColumns {
  columns: string[];
  data: TableData[];
}


@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  constructor(private http: HttpClient) { }

  getData(file: string | undefined, validColumns: string[]): Observable<TableDataWithColumns> {
    const parseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy'
    } as const;
    const raw = this.http.get(`assets/table-data/${file}`, { responseType: 'text' });
    const parsed = raw.pipe(map(data => parse<TableData>(data, parseOptions)));
    const withColumns = parsed.pipe(map(result => ({
      columns: this.filterColumns(result.meta.fields ?? [], validColumns),
      data: result.data
    })));

    return withColumns.pipe(shareReplay(1));
  }

  private filterColumns(columns: string[], validColumns: string[]): string[] {
    const validSet = new Set(validColumns);
    return columns.filter(col => validSet.has(col));
  }
}
