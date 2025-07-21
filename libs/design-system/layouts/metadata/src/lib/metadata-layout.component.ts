import { ChangeDetectionStrategy, Component } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';

const columns: TableColumn[] = [
  {
    column: 'provenance',
    label: 'Provenance',
    type: 'text',
  },
  {
    column: 'metadata',
    label: 'Metadata',
    type: 'markdown',
  },
];

const symbolUrl = 'https://google.com';

/** Example data */
const rows: TableRow[] = [
  { provenance: 'Creator(s)', metadata: `[Rachel Bajema](${symbolUrl})` },
  { provenance: 'Project lead', metadata: `[Katy Börner](${symbolUrl})` },
  {
    provenance: 'Reviewer(s)',
    metadata: `\n* [Sanjay Jain](${symbolUrl})\n* [Matthias Kretzler](${symbolUrl})\n* [M. Todd Valerius](${symbolUrl})`,
  },
  { provenance: 'DOI', metadata: `[https://doi.org/10.48539/HBM489.KLNJ.323](${symbolUrl})` },
  { provenance: 'HuBMAP ID', metadata: 'HBM283.BMNR.744' },
  { provenance: 'Date created', metadata: '2023-12-15' },
  { provenance: 'Date last modified', metadata: '2023-12-15' },
];

/** Metadata layout header */
@Component({
  selector: 'hra-metadata-layout-header',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutHeaderComponent {}

/** Metadata layout */
@Component({
  selector: 'hra-metadata-layout',
  imports: [HraCommonModule, TableComponent],
  templateUrl: './metadata-layout.component.html',
  styleUrl: './metadata-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePageSectionNavigation()],
})
export class MetadataLayoutComponent {
  /** Whether the screen width is currently greater than or equal to 1100px */
  protected isWideScreen = watchBreakpoint('(min-width: 640px)');

  rows = rows;
  columns = columns;
}
