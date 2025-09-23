import { Component, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { HraCommonModule } from '@hra-ui/common';

/**
 * Selector for version
 */
@Component({
  selector: 'hra-version-selector',
  imports: [HraCommonModule, MatSelectModule],
  templateUrl: './version-selector.component.html',
  styleUrl: './version-selector.component.scss',
})
export class VersionSelectorComponent {
  /** Current version */
  readonly version = input.required<string>();
  /** Versions available for selection */
  readonly availableVersions = input.required<string[]>();

  /** Emits new version id on change */
  readonly versionChange = output<string>();
}
