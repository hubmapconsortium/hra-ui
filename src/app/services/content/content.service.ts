import { parse } from 'yamljs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}
  public getContent<T = any>(fileName: string): Observable<T> {
    return this.http
      .get(`assets/content/pages/${fileName}.yaml`, {
        observe: 'body',
        responseType: 'text',
      })
      .pipe(map((yamlString) => parse(yamlString)));
  }
}














