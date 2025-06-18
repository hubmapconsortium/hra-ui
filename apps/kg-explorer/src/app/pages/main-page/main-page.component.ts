import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';
import { BrandModule } from '@hra-ui/design-system/brand';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';

/** Example download options */
const exampleDownloadOptions = [
  { name: 'SVG', icon: 'download' },
  { name: 'PNG', icon: 'download' },
  { name: 'Adobe Illustrator', icon: 'download' },
  {
    name: 'CSV - Crosswalk',
    description: 'A CSV file connecting digital objects to ontology terms in ASCT+B Tables.',
    icon: 'download',
  },
  {
    name: 'Turtle',
    description:
      'Terse RDF Triple Language (Turtle) format helps developers write SPARQL queries to HRA data by making its triple structure explicit and showing possible subjects, predicates, and objects.',
    icon: 'download',
  },
  {
    name: 'JSON-LD',
    description:
      'A lightweight Linked Data format, ideal for programming environments, such as REST Web services, and unstructured databases such as Apache CouchDB and MongoDB.',
    icon: 'download',
  },
  { name: 'RDF/XML', icon: 'download' },
  { name: 'N-Triple', icon: 'download' },
  { name: 'N-Quads', icon: 'download' },
];

/** Example row data */
const exampleData: TableRow[] = [
  {
    title: '2D Ascending Thin Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Cortical Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Descending Thin Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Inner Medullary Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Nephron Functional Tissue Unit (FTU) for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Outer Medullary Collecting Duct FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Renal Corpuscle Functional Tissue Unit (FTU) for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Thick Ascending Limb of Loop of Henle FTU for Kidney',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
  },
  {
    title: '2D Crypt of Lieberkuhn FTU for Large Intestine',
    objectUrl: 'https://google.com',
    type: 'product:ftu',
    organ: 'organ:heart',
    cellCount: 100,
    biomarkerCount: 100,
    lastModified: '2025-06',
    downloadOptions: exampleDownloadOptions,
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
    downloadOptions: exampleDownloadOptions,
  },
];

/** Column info */
const columns: TableColumn[] = [
  {
    column: 'download',
    label: '',
    type: {
      type: 'menu',
      icon: 'download',
      options: 'downloadOptions',
    },
  },
  {
    column: 'title',
    label: 'Digital Objects',
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
  readonly rows = input<TableRow[]>(exampleData);
  readonly columns = input<TableColumn[]>(columns);
}
