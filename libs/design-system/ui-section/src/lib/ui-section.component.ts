import { ChangeDetectionStrategy, Component, inject, InjectionToken, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLogoComponent } from '@hra-ui/design-system/product-logo';
import { SoftwareStatus, SoftwareStatusIndicatorComponent } from '@hra-ui/design-system/software-status-indicator';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIcon } from '@angular/material/icon';

/** Injection token for the window object */
export const WINDOW = new InjectionToken<typeof window>('window', {
  providedIn: 'root',
  factory: () => window,
});

@Component({
  selector: 'hra-ui-section',
  imports: [CommonModule, ProductLogoComponent, SoftwareStatusIndicatorComponent, ButtonsModule, MatIcon],
  templateUrl: './ui-section.component.html',
  styleUrl: './ui-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSectionComponent {
  /** Window object */
  private readonly window = inject(WINDOW);
  /** Product title */
  readonly tagline = input.required<string>();
  /** Product description */
  readonly description = input.required<string>();
  /** Product image path */
  readonly imagePath = input.required<string>();
  /** Product logo */
  readonly logoPath = input.required<string>();
  /** App software status */
  readonly appStatus = input<SoftwareStatus>();
  /** App url */
  readonly appUrl = input<string>();
  /** Documentation Link */
  readonly documentLink = input<string>();

  /** Open the app url */
  openAppUrl(): void {
    this.window.open(this.appUrl(), '_blank');
  }

  /** Open the documentation link */
  openDocumentationLink(): void {
    this.window.open(this.documentLink(), '_blank');
  }
}
