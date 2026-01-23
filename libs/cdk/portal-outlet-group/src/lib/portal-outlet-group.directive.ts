import { Directive, contentChildren, effect, input, Signal } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { HraPortalOutletNameDirective } from './portal-outlet-name.directive';

/**
 * Directive that manages a group of named portal outlets.
 * It takes portal content and can dynamically switch which outlet the content is attached to.
 *
 * @example
 * ```html
 * <div hraPortalOutletGroup [portal]="myPortal" [activeOutlet]="'main'">
 *   <div hraPortalOutletName="main"><ng-template cdkPortalOutlet /></div>
 *   <div hraPortalOutletName="secondary"><ng-template cdkPortalOutlet /></div>
 * </div>
 * ```
 */
@Directive({
  selector: '[hraPortalOutletGroup]',
  standalone: true,
})
export class HraPortalOutletGroupDirective {
  /** The portal content to be attached to the active outlet */
  readonly portal = input<Portal<unknown> | null>(null);

  /** The name of the active outlet where the portal should be attached */
  readonly activeOutlet = input<string>('');

  /** Query all registered portal outlet name directives within this group */
  private readonly outlets: Signal<readonly HraPortalOutletNameDirective[]> = contentChildren(
    HraPortalOutletNameDirective,
    { descendants: true },
  );

  /** Map of outlet names to their corresponding directives */
  private readonly outletMap = new Map<string, HraPortalOutletNameDirective>();

  /** Currently active outlet directive */
  private currentOutlet: HraPortalOutletNameDirective | null = null;

  constructor() {
    /** Effect to update the outlet map when outlets change */
    effect(() => {
      this.updateOutletMap();
    });

    /** Effect to handle portal attachment when portal or activeOutlet changes */
    effect(() => {
      this.attachPortalToActiveOutlet();
    });
  }

  /**
   * Registers an outlet with this group
   *
   * @param name The name of the outlet
   * @param outlet The outlet directive to register
   */
  registerOutlet(name: string, outlet: HraPortalOutletNameDirective): void {
    this.outletMap.set(name, outlet);
    this.attachPortalToActiveOutlet();
  }

  /**
   * Unregisters an outlet from this group
   *
   * @param name The name of the outlet to unregister
   */
  unregisterOutlet(name: string): void {
    const outlet = this.outletMap.get(name);
    if (outlet === this.currentOutlet) {
      this.detachCurrentPortal();
    }
    this.outletMap.delete(name);
  }

  /**
   * Updates the outlet map with the current content children
   */
  private updateOutletMap(): void {
    const outlets = this.outlets();
    this.outletMap.clear();

    for (const outlet of outlets) {
      const name = outlet.name();
      if (name) {
        this.outletMap.set(name, outlet);
      }
    }
  }

  /**
   * Attaches the portal to the currently active outlet
   */
  private attachPortalToActiveOutlet(): void {
    const portal = this.portal();
    const activeOutletName = this.activeOutlet();

    /** Detach from current outlet if switching */
    this.detachCurrentPortal();

    if (!portal || !activeOutletName) {
      return;
    }

    const targetOutlet = this.outletMap.get(activeOutletName);
    if (targetOutlet) {
      targetOutlet.attachPortal(portal);
      this.currentOutlet = targetOutlet;
    }
  }

  /**
   * Detaches the portal from the current outlet
   */
  private detachCurrentPortal(): void {
    if (this.currentOutlet) {
      this.currentOutlet.detachPortal();
      this.currentOutlet = null;
    }
  }
}
