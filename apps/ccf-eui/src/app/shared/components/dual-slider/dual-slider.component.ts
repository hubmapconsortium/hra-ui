import { ConnectedPosition, Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

/**
 * Component containing a button that when clicked will show a slider popover.
 */
@Component({
  selector: 'ccf-dual-slider',
  templateUrl: './dual-slider.component.html',
  styleUrls: ['./dual-slider.component.scss'],
  imports: [
    OverlayModule,
    PortalModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSliderModule,
    FormsModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DualSliderComponent implements OnDestroy, OnChanges {
  /**
   * Reference to the template for the slider popover.
   */
  @ViewChild(CdkPortal, { static: true }) popoverPortal!: CdkPortal;

  /**
   * Reference to the popover element.
   * This is undefined until the slider popover is initialized.
   */
  @ViewChild('popover', { read: ElementRef, static: false }) popoverElement!: ElementRef<HTMLElement>;

  /**
   * Which criteria the slider is selecting for.
   */
  @Input() label!: string;

  /**
   * The lower and upper range of the slider.
   */
  @Input() valueRange!: number[];

  /**
   * The current range selected.
   */
  @Input() selection!: number[];

  /**
   * Emits the new selection range when a change is made to it.
   */
  @Output() readonly selectionChange = new EventEmitter<number[]>();

  /**
   * Determines whether slider popover is shown.
   */
  isSliderOpen = false;

  /**
   * Value bound to the slider's low pointer value.
   */
  lowValue!: number;

  /**
   * Value bound to the slider's high pointer value.
   */
  highValue!: number;

  /**
   * Determines if slider contents are visible (used for fade-in effect).
   */
  contentsVisible = 'invisible';

  /**
   * Computes the current age range for display in the button.
   */
  get rangeLabel(): string {
    const { lowValue, highValue } = this;
    if (lowValue === highValue) {
      return `${lowValue}`;
    }
    return `${lowValue}-${highValue}`;
  }

  /**
   * Reference to the slider popover overlay.
   */
  private readonly overlayRef: OverlayRef;

  /**
   * Determines whether slider popover has been created and initialized.
   */
  private isSliderInitialized = false;

  /**
   * Creates an instance of dual slider component.
   *
   * @param overlay The overlay service used to create the slider popover.
   * @param element A reference to the component's element. Used during event handling.
   * @param ga Analytics service
   */
  constructor(
    overlay: Overlay,
    private readonly element: ElementRef<HTMLElement>,
    private readonly ga: GoogleAnalyticsService,
  ) {
    const position: ConnectedPosition = { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' };
    const positionStrategy = overlay.position().flexibleConnectedTo(element).withPositions([position]);
    this.overlayRef = overlay.create({
      panelClass: 'slider-pane',
      positionStrategy,
    });
  }

  /**
   * Updates selection when changes detected.
   *
   * @param changes Changes that have been made to the slider properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selection']) {
      // Detect when selection is changed and update low/high value.
      this.lowValue = Math.min(...this.selection);
      this.highValue = Math.max(...this.selection);
    }
  }

  /**
   * Angular's OnDestroy hook.
   * Cleans up the overlay.
   */
  ngOnDestroy(): void {
    this.overlayRef.dispose();
  }

  /**
   * Listens to document click, mouse movement, and touch event.
   * Closes the slider popover when such an event occurs outside the button or popover.
   *
   * @param target The element on which the event was fired.
   */
  @HostListener('document:click', ['$event.target'])
  @HostListener('document:touchstart', ['$event.target'])
  closeSliderPopover(target: HTMLElement): void {
    const { element, isSliderOpen, popoverElement } = this;
    const isEventOutside =
      !isSliderOpen || element.nativeElement.contains(target) || popoverElement?.nativeElement?.contains?.(target);
    if (isEventOutside) {
      return;
    }

    this.overlayRef.detach();
    this.isSliderInitialized = false;
    this.isSliderOpen = false;
    this.contentsVisible = 'invisible';
  }

  /**
   * Toggles the visibility of the slider popover.
   */
  toggleSliderPopover(): void {
    const { isSliderOpen, isSliderInitialized } = this;
    if (isSliderInitialized) {
      this.overlayRef.detach();
      this.isSliderInitialized = false;
    } else if (!isSliderInitialized && !isSliderOpen) {
      this.initializeSliderPopover();
    }

    this.contentsVisible = this.contentsVisible === 'visible' ? 'invisible' : 'visible';
    this.isSliderOpen = !isSliderOpen;
  }

  /**
   * Handler for updates to the slider values.
   * Emits the updated selection value array.
   */
  sliderValueChanged(): void {
    const { lowValue, highValue } = this;

    this.selection = [lowValue, highValue];
    this.ga.event('slider_range_change', 'dual_slider', `${this.label}:${lowValue}:${highValue}`);
    this.selectionChange.emit(this.selection);
  }

  /**
   * Creates and initializes the slider popover.
   */
  private initializeSliderPopover(): void {
    const { overlayRef, popoverPortal } = this;

    overlayRef.attach(popoverPortal);
    overlayRef.updatePosition();

    this.isSliderInitialized = true;
  }

  /**
   * Updates the slider's pointer value when Enter key is pressed.
   *
   * @param event Event passed into the component
   */
  updateRangeValue(event: KeyboardEvent, side: 'low' | 'high'): void {
    const newValue = Number((event.target as HTMLInputElement).value);
    if (event.key === 'Enter') {
      if (newValue >= Number(this.valueRange[0]) && newValue <= Number(this.valueRange[1])) {
        if (side === 'low') {
          this.lowValue = newValue;
        } else {
          this.highValue = newValue;
        }
      }
      (event.target as HTMLInputElement).value = String(newValue);
      (event.target as HTMLInputElement).blur();
      this.sliderValueChanged();
    }
  }
}
