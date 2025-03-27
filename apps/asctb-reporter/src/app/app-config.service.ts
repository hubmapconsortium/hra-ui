import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map, shareReplay, take } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SheetDetails } from './models/sheet.model';

@Injectable()
export class ConfigService {
  private readonly http = inject(HttpClient);

  allSheetConfigurations$ = this.http.get<SheetDetails[]>(environment.sheetConfigUrl).pipe(take(1), shareReplay(1));
  allOMAPSheetConfigurations$ = this.http
    .get<SheetDetails[]>(environment.omapSheetConfigUrl)
    .pipe(take(1), shareReplay(1));

  sheetConfiguration$ = this.allSheetConfigurations$.pipe(
    map((data) =>
      data
        .map((element) => ({
          ...element,
          version: element.version?.filter((version) => !version.viewValue.includes('DRAFT')) ?? [],
        }))
        .filter((element) => element.name === 'some' || element.version?.length > 0),
    ),
  );

  omapsheetConfiguration$ = this.allOMAPSheetConfigurations$.pipe(
    map((data) =>
      data
        .map((element) => ({
          ...element,
          version: element.version?.filter((version) => !version.viewValue.includes('DRAFT')) ?? [],
        }))
        .filter((element) => element.version.length > 0),
    ),
  );

  config$ = this.http.get<Record<string, unknown>>('assets/configuration.json').pipe(take(1), shareReplay(1));
}
