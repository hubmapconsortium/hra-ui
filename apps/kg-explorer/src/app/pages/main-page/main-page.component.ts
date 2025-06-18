import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';

/** Example data */
const rows: TableRow[] = [
  {
    title: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Cortical Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Descending Thin Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Inner Medullary Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Nephron Functional Tissue Unit (FTU) for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Outer Medullary Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Renal Corpuscle Functional Tissue Unit (FTU) for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Thick Ascending Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title: '2D Crypt of Lieberkuhn FTU for Large Intestine',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
  {
    title:
      'Anatomical Structures, Cell Types and Biomarkers (ASCT+B) Tables to 2D Functional Tissue Unit (FTU) Reference Object Library Crosswalk',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
  },
];

const columns: TableColumn[] = [
  {
    column: 'title',
    label: 'Digital Object',
    type: {
      type: 'link',
      urlColumn: 'objectUrl',
    },
  },
  {
    column: 'type',
    label: 'Type',
    type: 'icon',
  },
  {
    column: 'organ',
    label: 'Organ',
    type: 'icon',
  },
  {
    column: 'cellCount',
    label: '#Cell types',
    type: 'numeric',
  },
  {
    column: 'biomarkerCount',
    label: '#Biomarker types',
    type: 'numeric',
  },
  {
    column: 'lastModified',
    label: 'Date last modified',
    type: 'text',
  },
];

/** This component is used for rendering the main page of the application. */
@Component({
  selector: 'hra-kg-main-page',
  imports: [HraCommonModule, TableComponent, BrandModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  readonly rows = input<TableRow[]>(rows);
  readonly columns = input<TableColumn[]>(columns);
}
