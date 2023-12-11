import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Set } from './base-href.actions';

/**
 * State holding the base href
 */
@State<string>({
  name: 'baseHref',
  defaults: '',
})
@Injectable()
export class BaseHrefState {
  /**
   * Sets base href value
   * @param ctx state context
   * @param { baseHref } href value
   */
  @Action(Set)
  setBaseHref(ctx: StateContext<string>, { baseHref }: Set) {
    if (baseHref !== '' && !baseHref.endsWith('/')) {
      baseHref = baseHref + '/';
    }
    ctx.setState(baseHref);
  }
}
