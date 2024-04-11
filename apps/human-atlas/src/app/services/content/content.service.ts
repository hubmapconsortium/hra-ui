import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { load } from 'js-yaml';
import { PageDef } from '../../components/page-element/page-def';
import { PageSpec } from '../../utils/data-schema';

/** Service for loading the content from a YAML file */
@Injectable({
  providedIn: 'root',
})
export class ContentService {
  /** Initializes the HttpClient */
  constructor(private readonly http: HttpClient) {}

  /** Gets data from YAML file and returns an observable */
  getContent(fileName: string): Observable<PageDef[]> {
    return this.http
      .get(`assets/content/pages/${fileName}.yaml`, {
        observe: 'body',
        responseType: 'text',
      })
      .pipe(
        map((yamlString) => load(yamlString)),
        map((data) => PageSpec.parse(data) as PageDef[]),
      );
  }
}
