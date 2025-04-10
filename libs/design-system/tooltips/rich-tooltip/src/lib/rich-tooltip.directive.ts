import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, inject, input, output, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { RichTooltipSimpleContentComponent } from './simple-content/rich-tooltip-simple-content.component';

/**
 * Viewport margin for the rich tooltip
 */
const VIEWPORT_MARGIN = 8;

/**
 * Positions array for the rich tooltip
 */
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
  /**
   * Custom content for the rich tooltip
   * - Not required if need to use simple content variant
   */
  readonly customContent = input<unknown>(undefined, { alias: 'hraRichTooltip' });

  /**
   * Title for the rich tooltip
   * - Not required if using custom content variant
   */
  readonly title = input<string>(undefined, { alias: 'hraRichTooltipTitle' });

  /**
   * Description for the rich tooltip
   * - Not required if using the custom content variant
   */
  readonly description = input<string>(undefined, { alias: 'hraRichTooltipDescription' });

  /**
   * Action Text for the rich tooltip
   * - Not required if using the custom content variant
   */
  readonly actionText = input<string>(undefined, { alias: 'hraRichTooltipActionText' });

  /**
   * Action Click Output Emitter for the rich tooltip
   * - Not required to be subscribed to if using the custom content variant
   */
  readonly actionClick = output<void>({ alias: 'hraRichTooltipActionClick' });

  /**
   * Container view reference variable DI
   */
  private readonly viewContainerRef = inject(ViewContainerRef);

  /**
   * Overlay DI variable
   */
  private readonly overlay = inject(Overlay);

  /**
   * Position strategy for the rich tooltip
   */
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

  /**
   * Boolean flag indicating whether the
   * rich tooltip is currently visible
   */
  private open = false;

  /**
   * Subscription to handle click events on the
   * outside of the rich tooltip
   */
  private outsideEventsSubscription: Subscription | undefined;

  /**
   * Function to toggle the visibility of the
   * rich tooltip
   */
  protected toggleTooltip(): void {
    this.open = !this.open;

    if (this.open) {
      if (this.customContent()) {
        //
      } else {
        this.attachSimpleContent();
      }

      this.outsideEventsSubscription = this.overlayRef.outsidePointerEvents().subscribe((event) => {
        if (!this.viewContainerRef.element.nativeElement.contains(event?.target as Node)) {
          this.toggleTooltip();
        }
      });
    } else {
      this.outsideEventsSubscription?.unsubscribe();
      this.overlayRef.detach();
    }
  }

  /**
   * Function to initialize and attach the
   * simple content variant of the rich tooltip
   */
  private attachSimpleContent(): void {
    const portal = new ComponentPortal(RichTooltipSimpleContentComponent, this.viewContainerRef);
    const componentRef = this.overlayRef.attach(portal);
    componentRef.setInput('owner', this);
    componentRef.setInput('title', this.title);
    componentRef.setInput('description', this.description);
    componentRef.setInput('actionText', this.actionText);
    componentRef.instance.actionClick.subscribe(() => this.actionClick.emit());
  }
}
