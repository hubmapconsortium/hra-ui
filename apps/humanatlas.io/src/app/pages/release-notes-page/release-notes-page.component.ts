import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, effect, inject, linkedSignal, signal } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionModule } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { load } from 'js-yaml';
import { MarkdownModule } from 'ngx-markdown';
import { map, Observable } from 'rxjs';

import {
  ReleaseNotesPageData,
  ReleaseNotesPageDataSchema,
} from '../../resolvers/release-notes-page/release-notes-page.schema';

@Component({
  selector: 'hra-release-notes-page',
  imports: [HraCommonModule, PageSectionModule, SectionLinkComponent, MarkdownModule],
  templateUrl: './release-notes-page.component.html',
  styleUrl: './release-notes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReleaseNotesPageComponent {
  /** Http injector */
  readonly http = inject(HttpClient);

  /** Data to display on the page */
  readonly data = signal<ReleaseNotesPageData | undefined>(undefined);

  /** Current selected release version */
  readonly currentVersion = linkedSignal<number>(() => {
    const n = this.data();
    if (n) {
      return n.releaseVersion;
    }
    return 2.2;
  });

  /** Resolver based on current version */
  readonly resolver = linkedSignal<Observable<ReleaseNotesPageData>>(() =>
    this.releaseNotesResolver(this.currentVersion()),
  );

  /**
   * Subscribes to the current resolver to update data
   */
  constructor() {
    effect(() => {
      this.resolver().subscribe((data) => this.data.set(data));
    });
  }

  /**
   * Returns an observable for fetching release notes
   * @param version Current release version
   * @returns Observable with page data
   */
  releaseNotesResolver(version: number): Observable<ReleaseNotesPageData> {
    return this.http.get(`assets/content/pages-v2/release-notes/v${version}.yaml`, { responseType: 'text' }).pipe(
      map((yamlString) => load(yamlString)),
      map((raw) => ReleaseNotesPageDataSchema.parse(raw)),
    );
  }
}
