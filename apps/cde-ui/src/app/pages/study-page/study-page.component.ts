import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import saveAs from 'file-saver';
import { load } from 'js-yaml';
import { MarkdownModule } from 'ngx-markdown';
import * as z from 'zod';

import { HraCommonModule } from '@hra-ui/common';
import { injectAssetUrlResolver } from '@hra-ui/common/url';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';

/** Zod schema for raw study data from YAML */
const RawStudySchema = z.object({
  slug: z.string(),
  organName: z.string(),
  technology: z.string(),
  authors: z.string(),
  affiliations: z.string(),
  consortium: z.string().optional(),
  thumbnail: z.string().optional(),
  cellCount: z.number().optional(),
  description: z.string().optional(),
  datasets: z.array(z.record(z.string(), z.unknown())).optional(),
  euiUrl: z.string().optional(),
  publication: z.array(z.string()).optional(),
  publications: z.array(z.string()).optional(),
  citation: z.string().optional(),
  citations: z.array(z.string()).optional(),
});

type RawStudy = z.infer<typeof RawStudySchema>;

/** Publication link with optional label */
interface PublicationLink {
  url: string;
  label?: string;
}

/** Parsed study data for display */
interface StudyData {
  slug: string;
  tagline: string;
  taglineChips: string[];
  image: string;
  label: string;
  supportingText: string;
  tags: { icon: string; text: string }[];
  publications: PublicationLink[];
  isHraRegistered: boolean;
  euiUrl?: string;
  description?: string;
  datasets: Record<string, unknown>[];
}

/** Dataset row type for table display */
interface DatasetRow {
  slug: string;
  thumbnail: string;
  cellCount: number;
  originalCellTypesCount: number;
  level3CellTypesCount: number;
  level2CellTypesCount: number;
  level1CellTypesCount: number;
}

/** Table column configuration */
const DATASET_COLUMNS: TableColumn[] = [
  {
    column: 'actions',
    label: '',
    type: {
      type: 'buttonIcon',
      buttonLabel: 'Explore',
      previewIcon: 'preview',
      imageUrlColumn: 'thumbnail',
      imageAltColumn: 'slug',
      titleColumn: 'slug',
    },
  },
  { column: 'slug', label: 'Dataset ID', type: 'text' },
  { column: 'cellCount', label: '#Cells', type: 'numeric' },
  { column: 'originalCellTypesCount', label: '#Original Cell types', type: 'numeric' },
  { column: 'level3CellTypesCount', label: '#level 3 cell types', type: 'numeric' },
  { column: 'level2CellTypesCount', label: '#level 2 cell types', type: 'numeric' },
  { column: 'level1CellTypesCount', label: '#level 1 cell types', type: 'numeric' },
];

/** CSV headers for download */
const CSV_HEADERS = [
  'Dataset ID',
  '#Cells',
  '#Original Cell types',
  '#level 3 cell types',
  '#level 2 cell types',
  '#level 1 cell types',
];

/** Component for displaying a study page in the Cell Distance Explorer*/
@Component({
  selector: 'cde-study-page',
  imports: [
    HraCommonModule,
    MatChipsModule,
    MatIconModule,
    PageSectionComponent,
    SearchFilterComponent,
    TableOfContentsLayoutModule,
    TableComponent,
    ButtonsModule,
    TextHyperlinkComponent,
    MarkdownModule,
  ],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPageComponent {
  private readonly assetUrlResolver = injectAssetUrlResolver();
  private readonly route = inject(ActivatedRoute);

  /** Search query for filtering datasets */
  readonly searchQuery = signal('');

  /** Table columns configuration */
  readonly datasetColumns = DATASET_COLUMNS;

  /** Study slug from route params */
  private readonly selectedStudySlug = computed(() => this.route.snapshot.paramMap.get('studyName'));

  /** Fetch and parse YAML data */
  private readonly studiesResource = httpResource.text<StudyData[]>(
    () => this.assetUrlResolver('assets/data/gallery/data.yaml'),
    {
      parse: (yamlText: string) => this.parseGalleryYaml(yamlText).map((study) => this.transformStudy(study)),
      defaultValue: [],
    },
  );

  /** Currently selected study data */
  readonly studyData = computed(() => {
    const slug = this.selectedStudySlug();
    const studies = this.studiesResource.value();
    if (!slug || studies.length === 0) {
      return undefined;
    }
    return studies.find((s) => s.slug === slug);
  });

  /** All dataset rows (unfiltered) */
  private readonly allDatasetRows = computed((): DatasetRow[] => {
    return (
      this.studyData()?.datasets?.map((dataset) => ({
        slug: String(dataset['slug'] ?? ''),
        thumbnail: String(dataset['thumbnail'] ?? ''),
        cellCount: Number(dataset['cellCount'] ?? 0),
        originalCellTypesCount: Number(dataset['originalCellTypesCount'] ?? 0),
        level3CellTypesCount: Number(dataset['level3CellTypesCount'] ?? 0),
        level2CellTypesCount: Number(dataset['level2CellTypesCount'] ?? 0),
        level1CellTypesCount: Number(dataset['level1CellTypesCount'] ?? 0),
      })) ?? []
    );
  });

  /** Filtered dataset rows based on search query */
  readonly datasetRows = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const rows = this.allDatasetRows();
    if (!query) {
      return rows;
    }
    return rows.filter((row) => row.slug.toLowerCase().includes(query));
  });

  /** Download datasets as CSV */
  onDownloadCSVButtonClicked(): void {
    const rows = this.datasetRows();
    if (rows.length === 0) {
      return;
    }

    const csvContent = this.convertToCSV(rows);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    saveAs(blob, `${this.studyData()?.slug ?? 'datasets'}.csv`);
  }

  private convertToCSV(rows: DatasetRow[]): string {
    const dataRows = rows.map((row) =>
      [
        row.slug,
        row.cellCount,
        row.originalCellTypesCount,
        row.level3CellTypesCount,
        row.level2CellTypesCount,
        row.level1CellTypesCount,
      ].join(','),
    );
    return [CSV_HEADERS.join(','), ...dataRows].join('\n');
  }

  private parseGalleryYaml(yamlText: string): RawStudy[] {
    try {
      const parsedYaml = load(yamlText) as { studies?: unknown[] };
      const studies = Array.isArray(parsedYaml.studies) ? parsedYaml.studies : [];
      return studies.map((study) => RawStudySchema.parse(study));
    } catch {
      return [];
    }
  }

  /**
   * Transforms raw study data into StudyData format for display
   */
  private transformStudy(study: RawStudy): StudyData {
    const datasetCount = study.datasets?.length ?? 0;
    const taglineChips = [`${datasetCount} dataset${datasetCount !== 1 ? 's' : ''}`];
    if (study.cellCount) {
      taglineChips.push(`${study.cellCount.toLocaleString()} cells`);
    }

    const tags: { icon: string; text: string }[] = [];
    if (study.consortium) {
      tags.push({ icon: 'diversity_3', text: study.consortium });
    }
    const isHraRegistered = !!study.euiUrl;
    if (isHraRegistered) {
      tags.push({ icon: 'check_circle', text: 'HRA registered' });
    }

    const rawPublications = study.publication ?? study.publications ?? [];
    const publications = rawPublications
      .filter((url): url is string => typeof url === 'string' && url.trim() !== '')
      .map((url, idx) => ({
        url: url.trim(),
        label: study.citations?.[idx],
      }));

    return {
      slug: study.slug,
      tagline: `${study.organName}, ${study.technology}`,
      taglineChips,
      image: `assets/data/gallery/${study.thumbnail ?? ''}`,
      label: study.authors,
      supportingText: study.affiliations,
      tags,
      publications,
      isHraRegistered,
      euiUrl: study.euiUrl,
      description: study.description,
      datasets: study.datasets ?? [],
    };
  }
}
