import { HraCommonModule } from '@hra-ui/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { injectRouteData } from 'ngxtension/inject-route-data';
import { ReleaseNotesVersions } from '../../schemas/release-notes-version/release-notes-version.schema';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

/**
 * Dropdown menu for selecting release notes versions
 */
@Component({
  selector: 'hra-release-notes-version-selector',
  imports: [HraCommonModule, MatSelectModule],
  templateUrl: './release-notes-version-selector.component.html',
  styleUrl: './release-notes-version-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesVersionSelectorComponent {
  /** Selected release version */
  readonly version = injectParams((params) => (params['version'] as string | undefined)?.slice(1) ?? '');
  /** List of release note versions */
  readonly versions = injectRouteData((data) => (data['versions'] as ReleaseNotesVersions | undefined)?.versions ?? []);

  /** Router */
  private readonly router = inject(Router);

  /** Navigates to the selected release version */
  protected navigateToVersion(version: string): void {
    this.router.navigate(['release-notes', `v${version}`]);
  }
}
