import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { ReleaseNotesVersions } from '../../schemas/release-notes-version/release-notes-version.schema';

/**
 * Dropdown menu for selecting release notes versions
 */
@Component({
  selector: 'hra-release-notes-version-selector',
  imports: [CommonModule],
  templateUrl: './release-notes-version-selector.component.html',
  styleUrl: './release-notes-version-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesVersionSelectorComponent {
  /** Selected release version */
  readonly version = injectParams((params) => (params['version'] as string | undefined) ?? '');
  /** List of release note versions */
  readonly versions = injectRouteData((data) => (data['versions'] as ReleaseNotesVersions | undefined)?.versions ?? []);
}
