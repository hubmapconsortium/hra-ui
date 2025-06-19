import { ChangeDetectionStrategy, Component, computed, effect, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { IconsModule } from '@hra-ui/design-system/icons';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { DataViewerVariant, ReleaseVersionData } from './types/data-viewer.schema';
import { ViewerCardComponent } from './viewer-card/viewer-card.component';
import { ViewerMenuComponent } from './viewer-menu/viewer-menu.component';

/**
 * Data viewer component
 */
@Component({
  selector: 'hra-data-viewer',
  imports: [
    ButtonsModule,
    ExpansionPanelModule,
    FormsModule,
    HraCommonModule,
    IconsModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    PlainTooltipDirective,
    ViewerCardComponent,
    ViewerMenuComponent,
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
  readonly variant = input.required<DataViewerVariant>();

  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  /** model signal for the release version */
  readonly releaseVersion = model<string>();

  /** model signal for the organ */
  readonly organ = model<string>();

  /** Current selected release version */
  protected readonly releaseVersion_ = computed(() => {
    const releaseVersion = this.releaseVersion();
    const data = this.releaseVersionData();
    return data.find((item) => item.version === releaseVersion) ?? data[0];
  });

  /** Current organ selected */
  protected readonly organ_ = computed(() => {
    const releaseVersion = this.releaseVersion_();
    const organ = this.organ() ?? releaseVersion.organData[0].label;
    return releaseVersion.organData.find((item) => item.label === organ) ?? undefined;
  });

  /** constructor to set the release version and organ from the model from effect*/
  constructor() {
    effect(() => {
      const releaseVersion = this.releaseVersion_();
      this.releaseVersion.set(releaseVersion.version);
    });

    effect(() => {
      const organ = this.organ_();
      this.organ.set(organ?.label ?? '');
    });
  }
}
