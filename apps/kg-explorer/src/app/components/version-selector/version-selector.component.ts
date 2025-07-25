import { Component, computed, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

const VERSION_DATA: { version: string; label: string }[] = [
  {
    version: 'v2.3',
    label: '9th Release (v2.3)',
  },
  {
    version: 'v2.2',
    label: '8th Release (v2.2)',
  },
  {
    version: 'v2.1',
    label: '7th Release (v2.1)',
  },
  {
    version: 'v2.0',
    label: '6th Release (v2.0)',
  },
  {
    version: 'v1.4',
    label: '5th Release (v1.4)',
  },
  {
    version: 'v1.3',
    label: '4th Release (v1.3)',
  },
  {
    version: 'v1.2',
    label: '3rd Release (v1.2)',
  },
  {
    version: 'v1.1',
    label: '2nd Release (v1.1)',
  },
  {
    version: 'v1.0',
    label: '1st Release (v1.0)',
  },
];

@Component({
  selector: 'hra-version-selector',
  imports: [MatSelectModule],
  templateUrl: './version-selector.component.html',
  styleUrl: './version-selector.component.scss',
})
export class VersionSelectorComponent {
  readonly version = input.required<string>();
  readonly availableVersions = input.required<string[]>();
  readonly versionDataToDisplay = computed(() => {
    return VERSION_DATA.filter((entry) => this.availableVersions().includes(entry.version));
  });
  readonly versionChange = output<string>();

  navigateToVersion(version: string) {
    this.versionChange.emit(version);
  }
}
