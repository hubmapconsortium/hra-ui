import { CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { contentChild, Directive, effect, inject, input, OnDestroy, OnInit } from '@angular/core';
import { HraPortalOutletGroupDirective } from './portal-outlet-group.directive';

/**
 * Directive that wraps a CdkPortalOutlet with a name attribute.
 * Registers itself with the closest HraPortalOutletGroupDirective.
 */
@Directive({
  selector: '[hraPortalOutletName]',
  standalone: true,
})
export class HraPortalOutletNameDirective implements OnInit, OnDestroy {
  /** The name of this outlet, used to identify it within the group */
  readonly name = input.required<string>({ alias: 'hraPortalOutletName' });

  /** Reference to the CdkPortalOutlet contained within this element */
  private readonly portalOutlet = contentChild(CdkPortalOutlet);

  /** Reference to the parent portal outlet group, if any */
  private readonly group = inject(HraPortalOutletGroupDirective, { optional: true });

  /** Previous name used for tracking name changes */
  private previousName: string | null = null;

  /**
   * Creates an instance of hra portal outlet name directive.
   */
  constructor() {
    /** Effect to handle name changes and re-register with the group */
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

  /**
   * Attaches a portal to this outlet
   *
   * @param portal The portal to attach
   */
  attachPortal(portal: Portal<unknown>): void {
    const outlet = this.portalOutlet();
    if (outlet && !outlet.hasAttached()) {
      outlet.attach(portal);
    }
  }

  /**
   * Detaches the currently attached portal from this outlet
   */
  detachPortal(): void {
    const outlet = this.portalOutlet();
    if (outlet && outlet.hasAttached()) {
      outlet.detach();
    }
  }

  /**
   * Checks if this outlet has an attached portal
   *
   * @returns True if a portal is currently attached
   */
  hasAttached(): boolean {
    const outlet = this.portalOutlet();
    return outlet ? outlet.hasAttached() : false;
  }
}
