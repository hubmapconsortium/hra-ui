import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { BrandLogoComponent } from '../../../brand/logo/src/lib/logo.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { ScrollingModule as HraScrollingModule, ScrollOverflowFadeDirective } from '@hra-ui/design-system/scrolling';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Privacy Preferences Modal Component
 */
@Component({
  selector: 'hra-privacy-preferences-modal',
  imports: [
    HraCommonModule,
    MatButtonModule,
    MatIconModule,
    BrandLogoComponent,
    MatTabsModule,
    MatDividerModule,
    ButtonsModule,
    MatSlideToggle,
    HraScrollingModule,
    ScrollOverflowFadeDirective,
  ],
  templateUrl: './privacy-preferences-modal.component.html',
  styleUrl: './privacy-preferences-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPreferencesModalComponent {
  /** Tab index */
  readonly tabIndex = model(0);
}
