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
  @Action(Set)
  setBaseHref(ctx: StateContext<string>, { baseHref }: Set) {
    if (baseHref !== '' && !baseHref.endsWith('/')) {
      baseHref = baseHref + '/';
    }

    ctx.setState(baseHref);
  }
}
