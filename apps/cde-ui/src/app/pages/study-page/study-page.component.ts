import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkComponent } from '@hra-ui/design-system/buttons/text-hyperlink';
import { MarkdownComponent } from '@hra-ui/design-system/content-templates/markdown';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '@hra-ui/design-system/layouts/table-of-contents';
import { FooterComponent } from '@hra-ui/design-system/navigation/footer';
import { SearchFilterComponent } from '@hra-ui/design-system/search-filter';
import { TableColumn, TableComponent } from '@hra-ui/design-system/table';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';
import { Study } from '../../schemas/studies/studies.schema';

const TABLE_COLUMNS: TableColumn[] = [
  {
    column: 'route',
    label: '',
    type: {
      type: 'dataExploration',
      titleColumn: 'slug',
      imageUrlColumn: 'thumbnail',
    },
  },
  { column: 'slug', label: 'Dataset ID', type: 'text' },
  { column: 'cellCount', label: '#Cells', type: 'numeric' },
  { column: 'originalCellTypesCount', label: '#Original cell types', type: 'numeric' },
  { column: 'level3CellTypesCount', label: '#Level 3 cell types', type: 'numeric' },
  { column: 'level2CellTypesCount', label: '#Level 2 cell types', type: 'numeric' },
  { column: 'level1CellTypesCount', label: '#Level 1 cell types', type: 'numeric' },
];

const CSV_HEADERS = TABLE_COLUMNS.slice(1).map((col) => col.label);
const CSV_COLUMNS = TABLE_COLUMNS.slice(1).map((col) => col.column);

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
    FooterComponent,
    MarkdownComponent,
  ],
  templateUrl: './study-page.component.html',
  styleUrl: './study-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPageComponent {
  readonly study = input.required<Study>();

  /** Search query for filtering datasets */
  readonly searchQuery = signal('');

  protected readonly tableColumns = TABLE_COLUMNS;

  protected readonly datasetsWithRoutes = computed(() => {
    const datasets = this.study().datasets;
    return datasets.map((dataset) => ({
      ...dataset,
      route: `/gallery/${this.study().slug}/${dataset.slug}`,
    }));
  });

  protected readonly filteredDatasets = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const datasets = this.datasetsWithRoutes();
    if (!query) {
      return datasets;
    }

    return datasets.filter((dataset) => dataset.slug.toLowerCase().includes(query));
  });

  downloadDatasetsAsCsv(): void {
    const datasets = this.study().datasets;
    const header = unparse([CSV_HEADERS], { header: false });
    const content = unparse(datasets, { header: false, columns: CSV_COLUMNS });
    const result = new Blob([`${header}\r\n${content}`], { type: 'text/csv' });
    saveAs(result, `${this.study().slug}-datasets.csv`);
  }
}
