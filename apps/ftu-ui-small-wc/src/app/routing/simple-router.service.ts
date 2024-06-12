import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dispatch } from '@hra-ui/cdk/injectors';
import { ActiveFtuActions } from '@hra-ui/state';

@Injectable({ providedIn: 'root' })
export class NavigationLessRouter extends Router {
  private readonly setActive = dispatch(ActiveFtuActions.Load);

  override navigate(commands: unknown[], extras?: NavigationExtras | undefined): Promise<boolean> {
    const id = extras?.queryParams?.['id'];
    this.setActive(id);
    return Promise.resolve(true);
  }
}
