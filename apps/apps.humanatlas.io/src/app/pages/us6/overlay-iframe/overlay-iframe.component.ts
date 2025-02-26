import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BackButtonBarComponent } from '@hra-ui/design-system/buttons/back-button-bar';

@Component({
  selector: 'hra-overlay-iframe',
  standalone: true,
  imports: [CommonModule, OverlayModule, BackButtonBarComponent],
  templateUrl: './overlay-iframe.component.html',
  styleUrl: './overlay-iframe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayIframeComponent {
  private sanitizer = inject(DomSanitizer);

  readonly srcdoc = input.required<string | undefined>();

  readonly closeClick = output<void>();

  protected readonly blockScroll = inject(Overlay).scrollStrategies.block();

  protected get safeSrcdoc(): SafeHtml | undefined {
    const srcdocValue = this.srcdoc();
    return srcdocValue ? this.sanitizer.bypassSecurityTrustHtml(srcdocValue) : undefined;
  }
}
