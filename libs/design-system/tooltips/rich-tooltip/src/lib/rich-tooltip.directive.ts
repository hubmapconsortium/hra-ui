import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, inject, input, output, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RichTooltipSimpleContentComponent } from './simple-content/rich-tooltip-simple-content.component';

const VIEWPORT_MARGIN = 8; // TODO ask Libby
const POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
  },
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
  },
  {
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
  },
];

/**
 * HRA Rich Tooltip Directive
 */
@Directive({
  selector: '[hraRichTooltip]',
  host: {
    '(click)': 'toggleTooltip()',
  },
})
export class RichTooltipDirective {
  readonly customContent = input<unknown>(undefined, { alias: 'hraRichTooltip' });
  readonly tagline = input<string>(undefined, { alias: 'hraRichTooltipTagline' });
  readonly description = input<string>(undefined, { alias: 'hraRichTooltipDescription' });
  readonly action = input<string>(undefined, { alias: 'hraRichTooltipAction' });

  readonly actionClick = output<void>();

  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly overlay = inject(Overlay);
  private readonly positionStrategy = this.overlay
    .position()
    .flexibleConnectedTo(inject(ElementRef))
    .withFlexibleDimensions(true)
    .withGrowAfterOpen(true)
    .withPositions(POSITIONS)
    .withViewportMargin(VIEWPORT_MARGIN);
  private readonly overlayRef = this.overlay.create({
    disposeOnNavigation: true,
    hasBackdrop: false,
    positionStrategy: this.positionStrategy,
    scrollStrategy: this.overlay.scrollStrategies.reposition(),
  });

  private open = false;
  private outsideEventsSubscription: Subscription | undefined;

  protected toggleTooltip(): void {
    this.open = !this.open;

    if (this.open) {
      if (this.customContent()) {
        //
      } else {
        this.attachSimpleContent();
      }

      this.outsideEventsSubscription = this.overlayRef.outsidePointerEvents().subscribe(() => this.toggleTooltip());
    } else {
      this.outsideEventsSubscription?.unsubscribe();
      this.overlayRef.detach();
    }
  }

  private attachSimpleContent(): void {
    const portal = new ComponentPortal(RichTooltipSimpleContentComponent, this.viewContainerRef);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.setInput('owner', this);
  }
}
