import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { IconsModule } from '@hra-ui/design-system/icons';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

import { MetadataLayoutModule } from '../../components/metadata-layout/metadata-layout.module';
import { DigitalObjectMetadata, KnowledgeGraphObjectsData, PersonInfo } from '../../digital-objects.schema';
import { PRODUCT_ICON_MAP } from '../main-page/main-page.component';

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
  imports: [
    HraCommonModule,
    MatIconModule,
    ButtonsModule,
    PageSectionComponent,
    MetadataLayoutModule,
    MarkdownComponent,
    TableComponent,
    IconsModule,
  ],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
})
export class MetadataPageComponent {
  private readonly http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  readonly metadata = signal<DigitalObjectMetadata>(EMPTY_METADATA);

  readonly doData = input.required<KnowledgeGraphObjectsData>();
  readonly $doData = toObservable(this.doData);

  readonly icons = signal<string[]>([]);

  readonly columns = input.required<TableColumn[]>();

  readonly rows = computed(() => [
    { provenance: 'Creator(s)', metadata: this.createMarkdownList(this.metadata().was_derived_from.creators) },
    { provenance: 'Project lead', metadata: this.createMarkdownList(this.metadata().was_derived_from.project_leads) },
    {
      provenance: 'Reviewer(s)',
      metadata: this.createMarkdownList(this.metadata().was_derived_from.reviewers),
    },
    {
      provenance: 'DOI',
      metadata: `[${this.metadata().was_derived_from.doi}](${this.metadata().was_derived_from.doi})`,
    },
    { provenance: 'HuBMAP ID', metadata: this.metadata().was_derived_from.hubmapId },
    { provenance: 'Date created', metadata: this.metadata().was_derived_from.creation_date },
    { provenance: 'Date last modified', metadata: this.metadata().creation_date },
  ]);

  protected isWMediumScreen = watchBreakpoint('(min-width: 1100px), (max-width: 639px)');

  constructor() {
    const type = this.route.snapshot.paramMap.get('type') || '';
    const name = this.route.snapshot.paramMap.get('name') || '';
    const version = this.route.snapshot.paramMap.get('version') || '';

    this.$doData.subscribe((data) => {
      console.log(data);
      const pageItem = data['@graph'].find((item) => {
        return item['@id'] === `https://lod.humanatlas.io/${type}/${name}`;
      });
      console.log(pageItem);
    });

    this.icons.set([
      `product:${PRODUCT_ICON_MAP[type]}`,
      'organ:all-organs', //TODO: get organ from data
    ]);

    this.http
      .get(`https://lod.humanatlas.io/${type}/${name}/${version}`, { responseType: 'json' })
      .subscribe((data) => {
        console.log(data);
        this.metadata.set(data as DigitalObjectMetadata);
      });
  }

  createMarkdownLink(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  createMarkdownList(items: PersonInfo[]): string {
    if (items.length === 1) {
      return this.createMarkdownLink(items[0].label, items[0].id);
    }
    return items.map((item) => `\n* ${this.createMarkdownLink(item.label, item.id)}`).join();
  }
}
