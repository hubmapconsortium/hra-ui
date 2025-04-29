import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ContentTemplatesModule } from '@hra-ui/design-system/content-templates';
import { load } from 'js-yaml';
import { MarkdownModule } from 'ngx-markdown';
import { map, Observable } from 'rxjs';

import {
  ReleaseNotesSectionData,
  ReleaseNotesSectionDataSchema,
  ReleaseVersionData,
} from '../../resolvers/release-notes-page/release-notes-page.schema';

@Component({
  selector: 'hra-release-notes-page',
  imports: [
    HraCommonModule,
    ContentTemplatesModule,
    MarkdownModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ButtonsModule,
    MatIconModule,
  ],
  templateUrl: './release-notes-page.component.html',
  styleUrl: './release-notes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesPageComponent {
  /** Http injector */
  readonly http = inject(HttpClient);

  readonly router = inject(Router);

  readonly versions = input.required<ReleaseVersionData[]>();

  /** Current selected release version */
  readonly currentVersion = linkedSignal<ReleaseVersionData>(() => this.versions()[0]);

  /** Data to display on the page */
  readonly currentVersionData = linkedSignal<ReleaseNotesSectionData[]>(() => []);

  /** Resolver based on current version */
  readonly resolver = linkedSignal<Observable<ReleaseNotesSectionData[]>>(() =>
    this.releaseNotesResolver(this.currentVersion().version),
  );

  /**
   * Subscribes to the current resolver to update data
   */
  constructor() {
    effect(() => {
      this.resolver().subscribe((data) => {
        this.setCurrentVersionFromUrl(this.router.url);
        this.currentVersionData.set(data);
      });
    });
  }

  navigate(event: MatSelectChange) {
    this.router.navigate([`/release-notes/v${event.value.version}`]);
  }

  setCurrentVersionFromUrl(url: string) {
    const currentVersionNum = url.split('/')[2].slice(1);
    this.currentVersion.set(
      this.versions().find((v) => v.version.toString() === currentVersionNum) || this.versions()[0],
    );
  }

  /**
   * Returns an observable for fetching release notes
   * @param version Current release version
   * @returns Observable with page data
   */
  releaseNotesResolver(version: number): Observable<ReleaseNotesSectionData[]> {
    return this.http.get(`assets/content/pages-v2/release-notes/v${version}.yaml`, { responseType: 'text' }).pipe(
      map((yamlString) => load(yamlString)),
      map((raw) => ReleaseNotesSectionDataSchema.array().parse(raw)),
    );
  }
}
