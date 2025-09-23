import '@google/model-viewer';

import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { DigitalObjectsJsonLd, V1Service } from '@hra-api/ng-client';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { CopyableUrlContainerComponent } from '@hra-ui/design-system/copyable-url-container';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { MenuOptionsType, TableColumn } from '@hra-ui/design-system/table';
import { MarkdownComponent } from 'ngx-markdown';

import { MetadataLayoutModule } from '../../components/metadata-layout/metadata-layout.module';
import { ProvenanceMenuComponent } from '../../components/provenance-menu/provenance-menu.component';
import { DigitalObjectMetadata, PersonInfo } from '../../digital-objects-metadata.schema';
import { DownloadService } from '../../services/download.service';
import { getOrganIcon, getProductIcon, getProductLabel, sentenceCase } from '../../utils/utils';

/**
 * Metadata page for a digital object
 */
@Component({
  selector: 'hra-metadata-page',
  imports: [
    HraCommonModule,
    PageSectionComponent,
    MetadataLayoutModule,
    MarkdownComponent,
    ProvenanceMenuComponent,
    MatChipsModule,
    FooterComponent,
    CopyableUrlContainerComponent,
  ],
  templateUrl: './metadata-page.component.html',
  styleUrl: './metadata-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MetadataPageComponent {
  /** Router service */
  private readonly router = inject(Router);
  /** Activated route service */
  private readonly route = inject(ActivatedRoute);
  /** File download service */
  private readonly download = inject(DownloadService);
  /** HRA V1 API service */
  private readonly v1 = inject(V1Service);

  /** Raw digital object data from API */
  readonly doData = input.required<DigitalObjectsJsonLd>();
  /** Column data for metadata table */
  readonly columns = input.required<TableColumn[]>();
  /** Metadata for the digital object */
  readonly metadata = input.required<DigitalObjectMetadata>();

  /** Versions available for this digital object */
  readonly availableVersions = signal<string[]>([]);
  /** Current version selected */
  readonly currentVersion = signal<string>('');
  /** Icons to display on top of the page */
  readonly icons = signal<string[]>([]);
  /** File download options for this digital object */
  readonly downloadOptions = signal<MenuOptionsType[]>([]);
  /** Tags to display in Tags section (object type + organs) */
  readonly tags = signal<{ id: string; label: string; type: string }[]>([]);
  /** Data to display in the metadata table */
  readonly rows = signal<{ provenance: string; metadata: string }[]>([]);
  /** PURL for the object */
  readonly purl = signal<string>('');

  /** Determines if the screen is not medium-sized */
  protected isNotMediumScreen = watchBreakpoint('(min-width: 1100px), (max-width: 639px)');

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
    });

    toObservable(this.metadata).subscribe((metadata) => {
      if (metadata) {
        this.downloadOptions.set(this.download.getDownloadOptions(metadata));
        this.rows.set(
          [
            { provenance: 'Creator(s)', metadata: this.createMarkdownList(metadata.was_derived_from.creators) },
            {
              provenance: 'Project lead(s)',
              metadata: this.createMarkdownList(metadata.was_derived_from.project_leads),
            },
            {
              provenance: 'Reviewer(s)',
              metadata: this.createMarkdownList(metadata.was_derived_from.reviewers),
            },
            {
              provenance: 'DOI',
              metadata: metadata.was_derived_from.doi
                ? `[${metadata.was_derived_from.doi}](${metadata.was_derived_from.doi})`
                : '',
            },
            { provenance: 'HuBMAP ID', metadata: metadata.was_derived_from.hubmapId ?? '' },
            { provenance: 'Date published', metadata: metadata.was_derived_from.creation_date ?? '' },
            { provenance: 'Date last processed', metadata: metadata.creation_date ?? '' },
          ].filter((item) => item.metadata !== ''),
        );
      } else {
        this.router.navigate([`404`]);
      }
    });

    toObservable(this.doData).subscribe((data: DigitalObjectsJsonLd) => {
      if (data['@graph']) {
        const pageItem = data['@graph'].find((item) => {
          return item['@id'] === `https://lod.humanatlas.io/${type}/${name}`;
        });
        this.purl.set(pageItem?.purl || '');
        const icons = [getProductIcon(type)];
        if (pageItem?.organIds) {
          icons.push(getOrganIcon(pageItem));
        }
        this.icons.set(icons);

        this.v1.ontologyTreeModel({}).subscribe((ontologyData) => {
          if (pageItem) {
            this.availableVersions.set(pageItem.versions);
            const tags = [{ id: type, label: getProductLabel(type), type: 'do' }];
            for (const organId of pageItem.organIds || []) {
              tags.push({
                id: organId,
                label: sentenceCase(ontologyData.nodes[organId].label || ''),
                type: 'organs',
              });
            }
            this.tags.set(tags);
          }
        });
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

  /**
   * Navigates to the main page with the correct filters when a tag is clicked
   * @param id Filter id associated with tag
   * @param type Filter type ('do' or 'organs')
   */
  tagClick(id: string, type: string) {
    this.router.navigate([''], { queryParams: { [type]: id } });
  }
}
