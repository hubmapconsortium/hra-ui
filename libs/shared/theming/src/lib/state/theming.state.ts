import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { MaterialCssVariables, MaterialCssVarsService } from 'angular-material-css-vars';
import { load } from 'js-yaml';
import { map, Observable, tap } from 'rxjs';
import { Load } from './theming.actions';
import { ThemingContext, ThemingModel, THEMING_FILE_SCHEMA } from './theming.model';

@State<ThemingModel>({
  name: 'theming',
  defaults: {},
})
@Injectable()
export class ThemingState {
  private readonly http = inject(HttpClient);
  private readonly materialVars = inject(MaterialCssVarsService);

  @Action(Load)
  load(ctx: ThemingContext, { url }: Load): Observable<unknown> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url })),
      map((data) => THEMING_FILE_SCHEMA.parse(data)),
      tap((data) => ctx.setState(data)),
      tap((data) => this.setVariables(data))
    );
  }

  private setVariables(data: ThemingModel): void {
    for (const [key, value] of Object.entries(data)) {
      this.materialVars.setVariable(key as MaterialCssVariables, value);
    }
  }
}
