import '@google/model-viewer';

import { HttpClient } from '@angular/common/http';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { MenuOptionsType, TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

import { MetadataLayoutModule } from '../../components/metadata-layout/metadata-layout.module';
import { ProvenanceMenuComponent } from '../../components/provenance-menu/provenance-menu.component';
import { DigitalObjectMetadata, KnowledgeGraphObjectsData, PersonInfo } from '../../digital-objects.schema';
import { DownloadService } from '../../services/download.service';
import { ORGAN_ICON_MAP, PRODUCT_ICON_MAP } from '../main-page/main-page.component';

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

@Component({
  selector: 'hra-metadata-page',
  imports: [PageSectionComponent, MetadataLayoutModule, MarkdownComponent, ProvenanceMenuComponent, TableComponent],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MetadataPageComponent {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly download = inject(DownloadService);
  private route = inject(ActivatedRoute);

  readonly metadata = signal<DigitalObjectMetadata>(EMPTY_METADATA);

  readonly doData = input.required<KnowledgeGraphObjectsData>();
  readonly $doData = toObservable(this.doData);

  readonly icons = signal<string[]>([]);
  readonly availableVersions = signal<string[]>([]);
  readonly currentVersion = signal<string>(this.metadata().version);

  readonly columns = input.required<TableColumn[]>();

  readonly imageTypes: Record<string, string> = {
    '2d-ftu': 'image/svg+xml',
    'ref-organ': 'model/gltf-binary',
    landmark: 'model/gltf-binary',
    schema: 'image/svg+xml',
  };

  readonly downloadOptions = signal<MenuOptionsType[]>([]);

  readonly rows = computed(() =>
    [
      { provenance: 'Creator(s)', metadata: this.createMarkdownList(this.metadata().was_derived_from.creators) },
      { provenance: 'Project lead', metadata: this.createMarkdownList(this.metadata().was_derived_from.project_leads) },
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
      { provenance: 'Date created', metadata: this.metadata().was_derived_from.creation_date ?? '' },
      { provenance: 'Date last modified', metadata: this.metadata().creation_date ?? '' },
    ].filter((item) => item.metadata !== ''),
  );

  protected isWMediumScreen = watchBreakpoint('(min-width: 1100px), (max-width: 639px)');

  constructor() {
    const type = this.route.snapshot.paramMap.get('type') || '';
    const name = this.route.snapshot.paramMap.get('name') || '';
    const version = this.route.snapshot.paramMap.get('version') || '';
    this.currentVersion.set(version);

    effect(() => {
      this.router.navigate(['metadata', type, name, this.currentVersion()]);
      this.http
        .get(`https://lod.humanatlas.io/${type}/${name}/${this.currentVersion()}`, { responseType: 'json' })
        .subscribe((data) => {
          this.metadata.set(data as DigitalObjectMetadata);
          this.downloadOptions.set(this.download.getDownloadOptions(this.metadata()));
        });
    });

    this.$doData.subscribe((data) => {
      const pageItem = data['@graph'].find((item) => {
        return item['@id'] === `https://lod.humanatlas.io/${type}/${name}`;
      });
      const icons = [`product:${PRODUCT_ICON_MAP[type]}`];
      if (pageItem?.organs) {
        icons.push(
          this.getOrganIcon(pageItem?.organs && pageItem?.organs.length === 1 ? pageItem?.organs[0] : 'all-organs'),
        );
      }
      this.icons.set(icons);
      if (pageItem) {
        this.availableVersions.set(pageItem.versions);
      }
    });
  }

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

  getCsv(): string | undefined {
    const csvMatch = this.metadata().was_derived_from.distributions.find((dist) => dist.mediaType === 'text/csv');
    return csvMatch?.downloadUrl ?? undefined;
  }

  createMarkdownLink(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  createMarkdownList(items?: PersonInfo[]): string {
    if (!items) {
      return '';
    }
    if (items.length === 1) {
      return this.createMarkdownLink(items[0].label, items[0].id);
    }
    return items.map((item) => `\n* ${this.createMarkdownLink(item.label, item.id)}`).join();
  }

  getOrganIcon(organ: string): string {
    return `organ:${ORGAN_ICON_MAP[organ] ?? organ}`;
  }
}
