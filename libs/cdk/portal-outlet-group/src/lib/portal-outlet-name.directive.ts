import { CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { contentChild, Directive, effect, inject, input, OnDestroy, OnInit } from '@angular/core';
import { HraPortalOutletGroupDirective } from './portal-outlet-group.directive';

@Directive({
  selector: '[hraPortalOutletName]',
  standalone: true,
})
export class HraPortalOutletNameDirective implements OnInit, OnDestroy {
  readonly name = input.required<string>({ alias: 'hraPortalOutletName' });

  private readonly portalOutlet = contentChild(CdkPortalOutlet);

  private readonly group = inject(HraPortalOutletGroupDirective, { optional: true });

  private previousName: string | null = null;

  constructor() {
    effect(() => {
      const currentName = this.name();
      if (this.previousName !== null && this.previousName !== currentName && this.group) {
        this.group.unregisterOutlet(this.previousName);
        this.group.registerOutlet(currentName, this);
      }
      this.previousName = currentName;
    });
  }

  ngOnInit(): void {
    if (this.group) {
      this.group.registerOutlet(this.name(), this);
    }
  }

  ngOnDestroy(): void {
    if (this.group) {
      this.group.unregisterOutlet(this.name());
    }
  }

  attachPortal(portal: Portal<unknown>): void {
    const outlet = this.portalOutlet();
    if (outlet && !outlet.hasAttached()) {
      outlet.attach(portal);
    }
  }

  detachPortal(): void {
    const outlet = this.portalOutlet();
    if (outlet && outlet.hasAttached()) {
      outlet.detach();
    }
  }

  hasAttached(): boolean {
    const outlet = this.portalOutlet();
    return outlet ? outlet.hasAttached() : false;
  }
}
