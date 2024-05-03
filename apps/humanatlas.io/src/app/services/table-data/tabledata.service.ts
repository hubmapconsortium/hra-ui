import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { map, Observable, shareReplay } from 'rxjs';
import { TableData } from '../../components/table/table';

/** An interface representing the details of Table data with columns */
export interface TableDataWithColumns {
  /** Column names of the table */
  columns: string[];
  /** Cell data of the table */
  data: TableData[];
}

/** Service for parsing the content from a CSV file */
@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  /** Initializes the HttpClient */
  constructor(private readonly http: HttpClient) {}

  /** Parses the CSV file and returns an observable */
  getData(file: string | undefined, validColumns: string[]): Observable<TableDataWithColumns> {
    const parseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
    } as const;
    const raw = this.http.get(`assets/table-data/${file}`, {
      responseType: 'text',
    });
    const parsed = raw.pipe(map((data) => parse<TableData>(data, parseOptions)));
    const withColumns = parsed.pipe(
      map((result) => ({
        columns: this.filterColumns(result.meta.fields ?? [], validColumns),
        data: result.data,
      })),
    );

    return withColumns.pipe(shareReplay(1));
  }

  /** Filters columns and returns only ones to be displayed */
  private filterColumns(columns: string[], validColumns: string[]): string[] {
    const validSet = new Set(validColumns);
    return columns.filter((col) => validSet.has(col));
  }
}
