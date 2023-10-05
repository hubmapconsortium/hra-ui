import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { load } from 'js-yaml';
import { PageDef } from "../../components/page-element/page-def"
import { PageSpec } from '../../utils/data-schema';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private http: HttpClient) {}

  getContent(fileName: string): Observable<PageDef[]> {
    return this.http
      .get(`assets/content/pages/${fileName}.yaml`, {
        observe: 'body',
        responseType: 'text',
      })
      .pipe(
        map((yamlString) => load(yamlString)),
        map((data) => PageSpec.parse(data) as PageDef[])
      );
  }
}
