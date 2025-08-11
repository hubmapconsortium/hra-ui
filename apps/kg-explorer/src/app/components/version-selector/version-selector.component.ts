import { Component, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

/**
 * Selector for version
 */
@Component({
  selector: 'hra-version-selector',
  imports: [MatSelectModule],
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
