import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrandModule } from '@hra-ui/design-system/brand';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';

@Component({
  selector: 'hra-consent-banner',
  imports: [CommonModule, MatIconModule, BrandModule, ButtonsModule, TextHyperlinkComponent],
  templateUrl: './consent-banner.component.html',
  styleUrl: './consent-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsentBannerComponent {}
