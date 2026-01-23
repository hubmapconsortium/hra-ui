import { Directive, contentChildren, effect, input, Signal } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { HraPortalOutletNameDirective } from './portal-outlet-name.directive';

@Directive({
  selector: '[hraPortalOutletGroup]',
  standalone: true,
})
export class HraPortalOutletGroupDirective {
  readonly portal = input<Portal<unknown> | null>(null);

  readonly activeOutlet = input<string>('');

  private readonly outlets: Signal<readonly HraPortalOutletNameDirective[]> = contentChildren(
    HraPortalOutletNameDirective,
    { descendants: true },
  );

  private readonly outletMap = new Map<string, HraPortalOutletNameDirective>();

  private currentOutlet: HraPortalOutletNameDirective | null = null;

  constructor() {
    effect(() => {
      this.updateOutletMap();
    });

    effect(() => {
      this.attachPortalToActiveOutlet();
    });
  }

  registerOutlet(name: string, outlet: HraPortalOutletNameDirective): void {
    this.outletMap.set(name, outlet);
    this.attachPortalToActiveOutlet();
  }

  unregisterOutlet(name: string): void {
    const outlet = this.outletMap.get(name);
    if (outlet === this.currentOutlet) {
      this.detachCurrentPortal();
    }
    this.outletMap.delete(name);
  }

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

  private attachPortalToActiveOutlet(): void {
    const portal = this.portal();
    const activeOutletName = this.activeOutlet();

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

  private detachCurrentPortal(): void {
    if (this.currentOutlet) {
      this.currentOutlet.detachPortal();
      this.currentOutlet = null;
    }
  }
}
