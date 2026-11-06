import { hasModifierKey } from '@angular/cdk/keycodes';
import { ConnectedPosition, Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  computed,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTooltip } from '@angular/material/tooltip';
import { filter } from 'rxjs';

import { RichTooltipContainerComponent } from './content/rich-tooltip-content.component';
import { RichTooltipController } from './rich-tooltip.types';

/**
 * Viewport margin for the rich tooltip
 */
const VIEWPORT_MARGIN = 8;

/**
 * Default positions array
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
    '[attr.aria-expanded]': 'isOpen()',
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
  readonly tagline = input<string>('', { alias: 'hraRichTooltipTagline' });

  /**
   * Description for the rich tooltip
   * - Not required if using the custom content variant
   */
  readonly description = input<string>('', { alias: 'hraRichTooltipDescription' });

  /**
   * Action Text for the rich tooltip
   * - Not required if using the custom content variant
   */
  readonly actionText = input<string>('', { alias: 'hraRichTooltipActionText' });

  /**
   * Positions array for the rich tooltip
   */
  readonly positions = input<ConnectedPosition[]>(POSITIONS, { alias: 'hraRichTooltipPositions' });

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
   * Plain tooltip on the same element, such as the "Info" label on info buttons,
   * which is disabled while the rich tooltip is open so the two don't overlap
   */
  private readonly plainTooltip = inject(MatTooltip, { optional: true, self: true });

  /**
   * Position strategy for the rich tooltip
   */
  private readonly positionStrategy = computed(() => {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(true)
      .withGrowAfterOpen(true)
      .withPositions(this.positions())
      .withViewportMargin(VIEWPORT_MARGIN);
  });

  /**
   * Reference variable for the overlay
   */
  private readonly overlayRef = this.overlay.create({
    disposeOnNavigation: true,
    hasBackdrop: false,
    positionStrategy: this.positionStrategy(),
    scrollStrategy: this.overlay.scrollStrategies.reposition(),
  });

  /**
   * Whether the rich tooltip is currently visible
   */
  protected readonly isOpen = signal(false);

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

    effect(() => {
      this.overlayRef.updatePositionStrategy(this.positionStrategy());
    });

    this.overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (!this.elementRef.nativeElement.contains(event.target as Node | null)) {
          this.close();
        }
      });

    this.overlayRef
      .keydownEvents()
      .pipe(
        filter((event) => event.key === 'Escape' && !hasModifierKey(event)),
        takeUntilDestroyed(),
      )
      .subscribe((event) => {
        event.preventDefault();
        this.close();
      });
  }

  /**
   * Function to open the rich tooltip.
   */
  open(): void {
    if (!this.isOpen()) {
      this.attach();
      this.isOpen.set(true);
      if (this.plainTooltip) {
        this.plainTooltip.disabled = true;
      }
    }
  }

  /**
   * Function to close the rich tooltip.
   */
  close(): void {
    if (this.isOpen()) {
      this.detach();
      this.isOpen.set(false);
      if (this.plainTooltip) {
        this.plainTooltip.disabled = false;
      }
    }
  }

  /**
   * Function to toggles the rich tooltip.
   */
  toggle(): void {
    if (this.isOpen()) {
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
