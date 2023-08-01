import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Action, State } from '@ngxs/store';
import { MaterialCssVariables, MaterialCssVarsService } from 'angular-material-css-vars';
import { load } from 'js-yaml';
import { map, Observable, tap } from 'rxjs';
import { Load } from './theming.actions';
import { ThemingContext, ThemingModel, THEMING_FILE_SCHEMA } from './theming.model';

/**
 * State for keeping track of theming applied
 */
@State<ThemingModel>({
  /**
   * name of the state
   */
  name: 'theming',
  /**
   * state variables default value
   */
  defaults: {},
})
/**
 * Theming state class
 */
@Injectable()
export class ThemingState {
  /**
   * http service for link loading
   */
  private readonly http = inject(HttpClient);
  /**
   * Material-vars service for setting theming variables
   */
  private readonly materialVars = inject(MaterialCssVarsService);

  /**
   * Action for loading yaml, reading data from yaml, setting state variables, and set material-css-vars variables for dynamic theming.
   * @param ctx State Context
   * @param action Action with url(yaml url) to load
   * @returns asyncronous data from the url
   */
  @Action(Load)
  load(ctx: ThemingContext, { url }: Load): Observable<unknown> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map((data) => load(data, { filename: url })),
      map((data) => THEMING_FILE_SCHEMA.parse(data)),
      tap((data) => ctx.setState(data)),
      tap((data) => this.setVariables(data))
    );
  }

  /**
   * Set values to the material-css-vars pallete keys
   * @param data key-value pairs set in state
   */
  private setVariables(data: ThemingModel): void {
    for (const [key, value] of Object.entries(data)) {
      this.materialVars.setVariable(key as MaterialCssVariables, value);
    }
  }
}
