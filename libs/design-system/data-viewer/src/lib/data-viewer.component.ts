import { ChangeDetectionStrategy, Component, computed, input, linkedSignal, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { OrganLogoComponent, OrganLogoId } from '@hra-ui/design-system/brand/organ-logo';
import { ProductLogoComponent, toProductLogoId } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { ReleaseVersionData } from './types/data-viewer.schema';
import { ViewerCardComponent } from './viewer-card/viewer-card.component';
import { ViewerMenuComponent } from './viewer-menu/viewer-menu.component';
import { explicitEffect } from 'ngxtension/explicit-effect';

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
    OrganLogoComponent,
    FormsModule,
    ViewerMenuComponent,
    PlainTooltipDirective,
  ],
  templateUrl: './data-viewer.component.html',
  styleUrl: './data-viewer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DataViewerComponent {
  /** Release versions to include in the data viewer*/
  readonly releaseVersionData = input.required<ReleaseVersionData[]>();

  /** Data viewer variant */
  readonly variant = input.required({ transform: toProductLogoId });

  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  readonly releaseVersion = model<string>();

  readonly organ = model<string>();

  /** Current selected release version */
  protected readonly releaseVersion_ = computed(() => {
    const releaseVersion = this.releaseVersion();
    const data = this.releaseVersionData();
    return data.find((item) => item.version === releaseVersion) ?? data[0];
  });

  /** Current organ selected */
  protected readonly organ_ = computed(() => {
    const organ = this.organ();
    const releaseVersion = this.releaseVersion_();
    return releaseVersion.organData.find((item) => item.label === organ) ?? releaseVersion.organData[0];
  });

  /** Icon for the currently selected organ */
  protected readonly organIconId = computed(() => this.organ_().icon as OrganLogoId);

  /** Title to display on the data viewer */
  protected readonly viewerTitle = computed(() => {
    return this.variant() === 'ftu' ? 'Functional Tissue Units' : '3D Organs';
  });
}
