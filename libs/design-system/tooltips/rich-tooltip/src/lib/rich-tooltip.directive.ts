import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Directive, effect, ElementRef, inject, input, output, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RichTooltipContainerComponent } from './content/rich-tooltip-content.component';
import { RichTooltipController } from './rich-tooltip.types';

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
    '(click)': 'toggle()',
  },
})
export class RichTooltipDirective implements RichTooltipController {
  /**
   * Custom content for the rich tooltip
   * - Not required if need to use simple content variant
   */
  readonly customContainer = input<RichTooltipContainerComponent>(undefined, { alias: 'hraRichTooltip' });

  /**
   * Title for the rich tooltip
   * - Not required if using custom content variant
   */
  readonly tagline = input<string>(undefined, { alias: 'hraRichTooltipTagline' });

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
   * Element Ref for the rich tooltip
   */
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

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
    .flexibleConnectedTo(this.elementRef)
    .withFlexibleDimensions(true)
    .withGrowAfterOpen(true)
    .withPositions(POSITIONS)
    .withViewportMargin(VIEWPORT_MARGIN);

  /**
   * Reference variable for the overlay
   */
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
  private isOpen = false;

  /**
   * Container element variable for the rich tooltip
   */
  private container!: RichTooltipContainerComponent;

  /**
   * Constructor for the directive
   */
  constructor() {
    effect((onCleanup) => {
      const customContainer = this.customContainer();
      if (customContainer) {
        this.container = customContainer;
      } else {
        const ref = this.viewContainerRef.createComponent(RichTooltipContainerComponent);
        this.container = ref.instance;
        onCleanup(() => ref.destroy());
      }
    });

    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (!this.elementRef.nativeElement.contains(event.target as Node | null)) {
          this.close();
        }
      });
  }

  /**
   * Function to open the rich tooltip.
   */
  open(): void {
    if (!this.isOpen) {
      this.attach();
      this.isOpen = true;
    }
  }

  /**
   * Function to close the rich tooltip.
   */
  close(): void {
    if (this.isOpen) {
      this.detach();
      this.isOpen = false;
    }
  }

  /**
   * Function to toggles the rich tooltip.
   */
  toggle(): void {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Attaches the rich tooltip component to the overlay.
   */
  private attach(): void {
    const template = this.container.template();
    const portal = new TemplatePortal(template, this.viewContainerRef, { $implicit: this });
    this.container.closeDirectives().forEach((dir) => (dir.controller = this));
    this.overlayRef.attach(portal);
  }

  /**
   * Detaches the rich tooltip component from the overlay.
   */
  private detach(): void {
    this.overlayRef.detach();
  }
}
