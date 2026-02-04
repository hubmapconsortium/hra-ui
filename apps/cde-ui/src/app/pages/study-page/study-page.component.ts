import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import saveAs from 'file-saver';
import { MarkdownModule } from 'ngx-markdown';

import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { RawStudy, StudyDataType } from '../../schemas/study.schema';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';

/** Publication link with optional label */
interface PublicationLink {
  /** Publication URL */
  url: string;
  /** Optional label for the publication */
  label?: string;
}

/** Parsed study data for display */
interface StudyData {
  /** Study slug */
  slug: string;
  /** Study tagline */
  tagline: string;
  /** Study tagline chips */
  taglineChips: string[];
  /** Study image URL */
  image: string;
  /** Study label (authors) */
  label: string;
  /** Study supporting text (affiliations) */
  supportingText: string;
  /** Study tags */
  tags: { icon: string; text: string }[];
  /** Study publications */
  publications: PublicationLink[];
  /** Whether study is HRA registered */
  isHraRegistered: boolean;
  /** EUI URL if registered */
  euiUrl?: string;
  /** Study description */
  description?: string;
  /** Study datasets */
  datasets: Record<string, unknown>[];
}

/** Dataset row type for table display */
interface DatasetRow {
  /** Dataset slug */
  slug: string;
  /** Dataset thumbnail URL */
  thumbnail: string;
  /** Number of cells in dataset */
  cellCount: number;
  /** Number of original cell types */
  originalCellTypesCount: number;
  /** Number of level 3 cell types */
  level3CellTypesCount: number;
  /** Number of level 2 cell types */
  level2CellTypesCount: number;
  /** Number of level 1 cell types */
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

/** Component for displaying a study page in the Cell Distance Explorer */
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
    FooterComponent,
  ],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPageComponent {
  /** Resolved gallery data from parent route */
  readonly data = input.required<StudyDataType>();

  /** Study name from route param */
  readonly studyId = input.required<string>();

  /** Router instance for navigation */
  private readonly router = inject(Router);

  /** Search query for filtering datasets */
  readonly searchQuery = signal('');

  /** Table columns configuration */
  readonly datasetColumns = DATASET_COLUMNS;

  /** Currently selected study data (transformed for display) */
  readonly studyData = computed(() => {
    const studies = this.data()?.studies ?? [];
    const study = studies.find((s) => s.slug === this.studyId());
    return study ? this.transformStudy(study) : undefined;
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

  /** Navigate to dataset visualization */
  onExploreDataset(datasetId: string): void {
    const studySlug = this.studyId();
    if (studySlug && datasetId) {
      this.router.navigate(['/gallery', studySlug, datasetId]);
    }
  }

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

  /** Converts dataset rows to CSV format */
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

  /** Transforms raw study data into StudyData format for display */
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
