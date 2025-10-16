import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Contains pagination buttons and bullets for the carousel component
 */
@Component({
  selector: 'hra-carousel-controls',
  imports: [HraCommonModule, MatIconModule, ButtonsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  /** Reference to previous slide button */
  readonly prevButton = viewChild.required('prevButton', { read: ElementRef });
  /** Reference to next slide button */
  readonly nextButton = viewChild.required('nextButton', { read: ElementRef });
  /** Reference to pagination bullets */
  readonly paginationContainer = viewChild.required('paginationContainer', { read: ElementRef });
}
