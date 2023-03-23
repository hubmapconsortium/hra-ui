import { ConnectionPositionPair, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface HoverContext<T = unknown> {
  $implicit: T;
}

@Directive({
  selector: '[hraHover]',
  standalone: true,
})
export class HoverDirective<T = unknown> {
  @Input('hraHover')
  set content(content: TemplateRef<HoverContext<T>>) {
    this.portal = new TemplatePortal(content, this.viewContainerRef);
    this.updateContent();
  }

  private readonly el: Element = inject(ElementRef).nativeElement;

  private readonly overlayRef = inject(Overlay).create({
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

  private readonly viewContainerRef = inject(ViewContainerRef);

  private portal?: TemplatePortal<HoverContext<T>>;

  @HostListener('mouseover')
  startHover(): void {
    const { overlayRef, portal } = this;
    if (!overlayRef.hasAttached() && portal) {
      overlayRef.attach(portal);
    }
  }

  @HostListener('mouseout')
  endHover(): void {
    const { overlayRef } = this;
    if (overlayRef.hasAttached()) {
      overlayRef.detach();
    }
  }

  private updateContent(): void {
    const { overlayRef, portal } = this;
    if (overlayRef.hasAttached() && portal) {
      overlayRef.detach();
      overlayRef.attach(portal);
    }
  }
}
