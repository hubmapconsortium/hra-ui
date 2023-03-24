import { ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**  Interface for the hover context */
export interface HoverContext<T = unknown> {
  /** defining an implicit type */
  $implicit: T;
}

/** Defining a directive to be used across the application */
@Directive({
  /**  Selector for using the directive */
  selector: '[hraHover]',
  /** Defining the directive to be standalone */
  standalone: true,
})
export class HoverDirective<T = unknown> {
  /** Input for the template portal */
  @Input('hraHover')
  set content(content: TemplateRef<HoverContext<T>>) {
    this.portal = new TemplatePortal(content, this.viewContainerRef);
    this.updateContent();
  }

  /**  Defining an injectable element */
  private readonly el: Element = inject(ElementRef).nativeElement;

  /**  Defining the injectable overlay and setting its position */
  readonly overlayRef = inject(Overlay).create({
    positionStrategy: inject(Overlay)
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([
        new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }),
      ])
      .withPush(true),
  });

  /** creating an injectable container reference */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** creating a portal for hover */
  portal?: TemplatePortal<HoverContext<T>>;

  /** Function to handle the mouse over event and display the hover content */
  @HostListener('mouseover')
  startHover(): void {
    const { overlayRef, portal } = this;
    if (!overlayRef.hasAttached() && portal) {
      overlayRef.attach(portal);
    }
  }

  /** Function to handle the mouse out event and hide the hover content */
  @HostListener('mouseout')
  endHover(): void {
    const { overlayRef } = this;
    if (overlayRef.hasAttached()) {
      overlayRef.detach();
    }
  }

  /** Function to handle the updation of overlay with up to date content */
  private updateContent(): void {
    const { overlayRef, portal } = this;
    if (overlayRef.hasAttached() && portal) {
      overlayRef.detach();
      overlayRef.attach(portal);
    }
  }
}
