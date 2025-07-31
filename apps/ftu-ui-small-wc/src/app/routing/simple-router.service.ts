import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { dispatch } from '@hra-ui/cdk/injectors';
import { ActiveFtuActions } from '@hra-ui/state';

/**
 * A custom router service that overrides the default navigation behavior
 * to dispatch an action when navigating.
 */
@Injectable({ providedIn: 'root' })
export class NavigationLessRouter extends Router {
  /**
   * Dispatches an action to set the active FTU when navigating.
   * @param id The ID of the FTU to set as active.
   */
  private readonly setActive = dispatch(ActiveFtuActions.Load);

  /**
   * Overrides the navigate method to dispatch an action instead of performing navigation.
   * @param commands The commands to navigate to.
   * @param extras Optional navigation extras.
   * @returns A promise that resolves to true, indicating the action was dispatched.
   */
  override navigate(commands: unknown[], extras?: NavigationExtras | undefined): Promise<boolean> {
    const id = extras?.queryParams?.['id'];
    this.setActive(id);
    return Promise.resolve(true);
  }
}
