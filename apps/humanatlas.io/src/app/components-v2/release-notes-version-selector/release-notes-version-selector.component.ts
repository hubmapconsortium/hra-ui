import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { ReleaseNotesVersions } from '../../schemas/release-notes-version/release-notes-version.schema';

@Component({
  selector: 'hra-release-notes-version-selector',
  imports: [CommonModule],
  templateUrl: './release-notes-version-selector.component.html',
  styleUrl: './release-notes-version-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesVersionSelectorComponent {
  readonly version = injectParams((params) => (params['version'] as string | undefined) ?? '');
  readonly versions = injectRouteData((data) => (data['versions'] as ReleaseNotesVersions | undefined)?.versions ?? []);
}
