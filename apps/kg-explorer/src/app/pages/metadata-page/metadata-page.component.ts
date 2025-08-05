import '@google/model-viewer';

import { HttpClient } from '@angular/common/http';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { MenuOptionsType, TableColumn } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

import { MetadataLayoutModule } from '../../components/metadata-layout/metadata-layout.module';
import { ProvenanceMenuComponent } from '../../components/provenance-menu/provenance-menu.component';
import { DigitalObjectMetadata, KnowledgeGraphObjectsData, PersonInfo } from '../../digital-objects.schema';
import { DownloadService } from '../../services/download.service';
import { sentenceCase } from '../../utils/sentence-case';
import { DO_INFO, ORGAN_ICON_MAP } from '../main-page/main-page.component';

/** Empty metadata object */
const EMPTY_METADATA: DigitalObjectMetadata = {
  $schema: '',
  '@context': '',
  '@type': '',
  creation_date: '',
  creators: [],
  description: '',
  distributions: [],
  id: '',
  label: '',
  license: '',
  publisher: '',
  see_also: '',
  title: '',
  type: '',
  version: '',
  was_derived_from: {
    citation: '',
    citationOverall: '',
    creation_date: '',
    creators: [],
    description: '',
    distributions: [],
    doi: '',
    funders: [],
    hubmapId: '',
    id: '',
    label: '',
    license: '',
    project_leads: [],
    publisher: '',
    reviewers: [],
    title: '',
  },
};

/**
 * Metadata page for a digital object
 */
@Component({
  selector: 'hra-metadata-page',
  imports: [PageSectionComponent, MetadataLayoutModule, MarkdownComponent, ProvenanceMenuComponent, MatChipsModule],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MetadataPageComponent {
  /** Http client service */
  private readonly http = inject(HttpClient);
  /** Router service */
  private readonly router = inject(Router);
  /** Activated route service */
  private readonly route = inject(ActivatedRoute);
  /** File download service */
  private readonly download = inject(DownloadService);

  /** Raw digital object data from API */
  readonly doData = input.required<KnowledgeGraphObjectsData>();
  /** Column data for metadata table */
  readonly columns = input.required<TableColumn[]>();

  /** Metadata for the digital object */
  readonly metadata = signal<DigitalObjectMetadata>(EMPTY_METADATA);
  /** Versions available for this digital object */
  readonly availableVersions = signal<string[]>([]);
  /** Current version selected */
  readonly currentVersion = signal<string>(this.metadata().version);
  /** Icons to display on top of the page */
  readonly icons = signal<string[]>([]);
  /** File download options for this digital object */
  readonly downloadOptions = signal<MenuOptionsType[]>([]);
  /** Tags to display in Tags section (object type + organs) */
  readonly tags = signal<{ id: string; label: string; type: string }[]>([]);

  /** Data to display in the metadata table */
  readonly rows = computed(() =>
    [
      { provenance: 'Creator(s)', metadata: this.createMarkdownList(this.metadata().was_derived_from.creators) },
      {
        provenance: 'Project lead(s)',
        metadata: this.createMarkdownList(this.metadata().was_derived_from.project_leads),
      },
      {
        provenance: 'Reviewer(s)',
        metadata: this.createMarkdownList(this.metadata().was_derived_from.reviewers),
      },
      {
        provenance: 'DOI',
        metadata: this.metadata().was_derived_from.doi
          ? `[${this.metadata().was_derived_from.doi}](${this.metadata().was_derived_from.doi})`
          : '',
      },
      { provenance: 'HuBMAP ID', metadata: this.metadata().was_derived_from.hubmapId ?? '' },
      { provenance: 'Date published', metadata: this.metadata().was_derived_from.creation_date ?? '' },
      { provenance: 'Date last processed', metadata: this.metadata().creation_date ?? '' },
    ].filter((item) => item.metadata !== ''),
  );

  /** Determines if the screen is medium-sized */
  protected isWMediumScreen = watchBreakpoint('(min-width: 1100px), (max-width: 639px)');

  /** For these DoTypes the corresponding image types will be displayed on the page */
  readonly imageTypes: Record<string, string> = {
    '2d-ftu': 'image/svg+xml',
    'ref-organ': 'model/gltf-binary',
    landmark: 'model/gltf-binary',
    schema: 'image/svg+xml',
  };

  /**
   * Fetches digital object metadata from API, sets current data version, and sets the correct product/organ icons
   */
  constructor() {
    const type = this.route.snapshot.paramMap.get('type') || '';
    const name = this.route.snapshot.paramMap.get('name') || '';
    const version = this.route.snapshot.paramMap.get('version') || '';
    this.currentVersion.set(version);

    effect(() => {
      this.router.navigate([type, name, this.currentVersion()]);
      this.http
        .get(`https://lod.humanatlas.io/${type}/${name}/${this.currentVersion()}`, { responseType: 'json' })
        .subscribe((data) => {
          this.metadata.set(data as DigitalObjectMetadata);
          this.downloadOptions.set(this.download.getDownloadOptions(this.metadata()));
        });
    });

    toObservable(this.doData).subscribe((data) => {
      const pageItem = data['@graph'].find((item) => {
        return item['@id'] === `https://lod.humanatlas.io/${type}/${name}`;
      });
      const icons = [`product:${DO_INFO[type].icon}`];
      if (pageItem?.organs) {
        icons.push(
          this.getOrganIcon(pageItem?.organs && pageItem?.organs.length === 1 ? pageItem?.organs[0] : 'all-organs'),
        );
      }
      this.icons.set(icons);
      if (pageItem) {
        this.availableVersions.set(pageItem.versions);
        const tags = [{ id: pageItem.doType, label: DO_INFO[pageItem.doType].label, type: 'do' }];
        for (const organ of pageItem.organs || []) {
          tags.push({
            id: organ,
            label: sentenceCase(organ),
            type: 'organs',
          });
        }
        this.tags.set(tags);
      }
    });
  }

  /**
   * Returns image url for the digital object, if applicable
   * @returns image url
   */
  getImage(): string | undefined {
    const mediaType = this.imageTypes[this.metadata().type];
    if (this.imageTypes[this.metadata().type]) {
      const distributions = this.metadata().was_derived_from.distributions;
      const mediaMatch = distributions.find((dist) => dist.mediaType === mediaType);
      if (mediaMatch) {
        return mediaMatch.downloadUrl;
      }
    }
    return undefined;
  }

  // /**
  //  * Returns CSV  downloadUrl for the digital object, if available
  //  * @returns csv url
  //  */
  // private getCsv(): string | undefined {
  //   const csvMatch = this.metadata().was_derived_from.distributions.find((dist) => dist.mediaType === 'text/csv');
  //   return csvMatch?.downloadUrl ?? undefined;
  // }

  /**
   * Returns a string formated as a markdown link from text and url
   * @param text Link text
   * @param url Link url
   * @returns Markdown link
   */
  private createMarkdownLink(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  /**
   * Creates a list of markdown links (or a single markdown link) from person info data, if available
   * @param items info data
   * @returns list of markdown links
   */
  private createMarkdownList(items?: PersonInfo[]): string {
    if (!items) {
      return '';
    }
    if (items.length === 1) {
      return this.createMarkdownLink(items[0].label, items[0].id);
    }
    return items.map((item) => `\n* ${this.createMarkdownLink(item.label, item.id)}`).join();
  }

  private getOrganIcon(organ: string): string {
    return `organ:${ORGAN_ICON_MAP[organ] ?? organ}`;
  }

  tagClick(id: string, type: string) {
    this.router.navigate([''], { queryParams: { [type]: id } });
  }
}
