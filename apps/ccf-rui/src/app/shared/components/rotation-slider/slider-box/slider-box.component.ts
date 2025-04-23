import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { Axis, Rotation } from '../rotation-slider.component';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

/** Slider box */
@Component({
  selector: 'ccf-slider-box',
  templateUrl: './slider-box.component.html',
  styleUrl: './slider-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SliderBoxComponent {
  /** Slider axis */
  @Input() sliderAxis!: Axis;
  /** Rotation value */
  @Input() rotation!: Rotation;
  /** Step size to increase or decrease value by */
  @Input() step!: number;
  /** Reset rotation */
  @Output() readonly resetRotation = new EventEmitter<string>();
  /** Update rotation */
  @Output() readonly changeRotation = new EventEmitter<string>();
  /** View child of slider box content */
  @ViewChild('sliderContent') sliderContent!: TemplateRef<unknown>;

  /** Overlay  of slider box component */
  private readonly overlay = inject(Overlay);
  /** Element reference of slider box component */
  private readonly elementRef = inject(ElementRef);
  /** View container reference of slider box component */
  private readonly viewContainerRef = inject(ViewContainerRef);
  /** Overlay reference of slider box component */
  private overlayRef: OverlayRef | null = null;

  /** Displays a slider*/
  showSlider(): void {
    if (this.overlayRef) {
      return;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'center',
          overlayX: 'end',
          overlayY: 'center',
          offsetX: 80,
        },
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: 'rotation-slider-overlay',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });

    const portal = new TemplatePortal(this.sliderContent, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => this.closeSlider());
  }

  /** Closes the slider */
  private closeSlider(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
