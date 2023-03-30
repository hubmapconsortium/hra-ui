import { ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**  Context passed to hover content templates */
export interface HoverContext<T = unknown> {
  /** Data provided by the user for use inside the content template */
  $implicit: T;
}

/** Hover overlay directive to be used across the application */
@Directive({
  selector: '[hraHover]',
  standalone: true,
})
export class HoverDirective<T = unknown> {
  /**  Setter for the content to be displayed in the overlay */
  @Input('hraHover')
  set content(content: TemplateRef<HoverContext<T>>) {
    this.portal = new TemplatePortal(content, this.viewContainerRef, this._data);
    this.updateContent();
  }

  /** Setter for the context that is to be displayed in the portal attached to the overlay */
  @Input('hraHoverData')
  set data(data: T) {
    this._data = { $implicit: data };
    if (this.portal) {
      this.portal.context = this._data;
      this.updateContent();
    }
  }

  /**  Reference to the element that the directive is attached to */
  private readonly el: Element = inject(ElementRef).nativeElement;

  /**  Reference to the overlay that is created when the userhovers over the element along with its position setting */
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

  /** Reference view container that the directive is attached to */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /** Store the data that is passed into the data input property */
  private _data?: HoverContext<T>;

  /** Portal that is created to display the overlay */
  portal?: TemplatePortal<HoverContext<T>>;

  /** Function to handle the mouse over event to attach the portal and display the hover content */
  @HostListener('mouseover')
  startHover(): void {
    const { overlayRef, portal } = this;
    if (!overlayRef.hasAttached() && portal) {
      overlayRef.attach(portal);
    }
  }

  /** Function to handle the mouse out event to detach the portal  */
  @HostListener('mouseout')
  endHover(): void {
    const { overlayRef } = this;
    if (overlayRef.hasAttached()) {
      overlayRef.detach();
    }
  }

  /** Function to handle the updation of overlay with up to date content when the input changes */
  private updateContent(): void {
    const { overlayRef, portal } = this;
    if (overlayRef.hasAttached() && portal) {
      overlayRef.detach();
      overlayRef.attach(portal);
    }
  }
}
