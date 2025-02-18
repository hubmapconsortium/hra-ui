import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'hra-overlay-iframe',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './overlay-iframe.component.html',
  styleUrl: './overlay-iframe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayIframeComponent {
  readonly srcdoc = input.required<string | undefined>();

  readonly closeClick = output();

  protected readonly blockScroll = inject(Overlay).scrollStrategies.block();
}
