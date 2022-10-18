import { Injectable } from '@angular/core';
import { TableData } from 'src/app/components/table/table';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { parse } from 'papaparse';

@Injectable({
  providedIn: 'root'
})

export class TableDataService {

  constructor(private http: HttpClient) { }

  getData(file: string | undefined): Observable<TableData[]> {
    return this.http.get(`/assets/table-data/${file}`, { responseType: 'text' }).pipe(
      map(data => parse<TableData>(data, {
        header: true, dynamicTyping: true, skipEmptyLines: 'greedy'
      }).data)
    );
  }
}
