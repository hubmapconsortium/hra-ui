import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';

import { ViewerCardComponent } from './viewer-card/viewer-card.component';

/** Viewer variant types */
export type ViewerVariant = 'ftu' | '3d_organ_model';

/**
 * Data viewer component
 */
@Component({
  selector: 'hra-data-viewer',
  imports: [
    HraCommonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    ButtonsModule,
    MatSelectModule,
    ExpansionPanelModule,
    ViewerCardComponent,
    ProductLogoComponent,
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DataViewerComponent {
  /** All available dropdown options */
  readonly options = input.required<string[]>();

  /** Data viewer variant */
  readonly variant = input.required<ViewerVariant>();

  readonly icon = computed(() => `organ:${this.organ()}`);

  readonly organ = signal<string>('brain');
}
