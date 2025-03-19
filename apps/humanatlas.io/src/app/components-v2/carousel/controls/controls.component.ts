import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

@Component({
  selector: 'hra-carousel-controls',
  imports: [CommonModule, MatIconModule, ButtonsModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent {
  readonly prevButton = viewChild.required('prevButton', { read: ElementRef });
  readonly nextButton = viewChild.required('nextButton', { read: ElementRef });
  readonly paginationContainer = viewChild.required('paginationContainer', { read: ElementRef });
}
