import { Injectable } from '@angular/core';
import { TableData } from 'src/app/components/table/table';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TableDataService {

  constructor(private http:HttpClient){}

  getData(file: string):Observable<TableData[]> {
    return this.http.get<TableData[]>(`/assets/table-data/${file}`,{ responseType: 'json' }
    );
  }
}
