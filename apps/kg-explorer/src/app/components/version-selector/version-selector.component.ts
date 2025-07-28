import { Component, computed, input, output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

export const VERSION_DATA: Record<string, { label: string; date: string }> = {
  'v2.3': {
    label: '9th Release (v2.3)',
    date: 'June 2025',
  },
  'v2.2': {
    label: '8th Release (v2.2)',
    date: 'December 2024',
  },
  'v2.1': {
    label: '7th Release (v2.1)',
    date: 'June 2024',
  },
  'v2.0': {
    label: '6th Release (v2.0)',
    date: 'December 2023',
  },
  'v1.4': {
    label: '5th Release (v1.4)',
    date: 'June 2023',
  },
  'v1.3': {
    label: '4th Release (v1.3)',
    date: 'December 2022',
  },
  'v1.2': {
    label: '3rd Release (v1.2)',
    date: 'June 2022',
  },
  'v1.1': {
    label: '2rd Release (v1.1)',
    date: 'December 2021',
  },
  'v1.0': {
    label: '1st Release (v1.0)',
    date: 'June 2021',
  },
};

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
    return Object.keys(VERSION_DATA).filter((entry) => this.availableVersions().includes(entry));
  });
  readonly versionChange = output<string>();

  versionData = VERSION_DATA;

  navigateToVersion(version: string) {
    this.versionChange.emit(version);
  }
}
