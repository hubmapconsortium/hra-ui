import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';

/** Consent Banner Component */
@Component({
  selector: 'hra-consent-banner',
  imports: [CommonModule, MatIconModule, BrandModule, ButtonsModule, TextHyperlinkComponent],
  templateUrl: './consent-banner.component.html',
  styleUrl: './consent-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentBannerComponent {
  /** Emitted when the "Allow all Click" button is clicked */
  readonly allowAllClick = output<void>();

  /** Emitted when the "Allow necessary only Click" button is clicked */
  readonly allowNecessaryOnlyClick = output<void>();

  /** Emitted when the "Customize Click" button is clicked */
  readonly customizeClick = output<void>();
}
