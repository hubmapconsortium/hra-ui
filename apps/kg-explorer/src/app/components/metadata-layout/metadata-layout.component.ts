import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { MenuOptionsType, TableColumn, TableRow } from '@hra-ui/design-system/table';

import { ProvenanceMenuComponent } from '../provenance-menu/provenance-menu.component';

/** Metadata layout header */
@Component({
  selector: 'hra-metadata-layout-header',
  template: `<ng-content />`,
  styles: ['::ng-deep h1 > mat-divider { display: none !important; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutHeaderComponent {}

/** Metadata layout content */
@Component({
  selector: 'hra-metadata-layout-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutContentComponent {}

/** Metadata layout */
@Component({
  selector: 'hra-metadata-layout',
  imports: [ProvenanceMenuComponent],
  templateUrl: './metadata-layout.component.html',
  styleUrl: './metadata-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePageSectionNavigation()],
})
export class MetadataLayoutComponent {
  /** Whether the screen width is currently greater than or equal to 1100px */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');
  /** Whether the screen width is currently less than 639px */
  protected isSmallScreen = watchBreakpoint('(max-width: 639px)');

  /** Row data for the metadata table */
  readonly rows = input.required<TableRow[]>();
  /** Column data for the metadata table */
  readonly columns = input.required<TableColumn[]>();
  /** Current data version */
  readonly version = input.required<string>();
  /** All available data versions */
  readonly availableVersions = input.required<string[]>();
  /** Options for distribution downloads */
  readonly downloadOptions = input.required<MenuOptionsType[]>();

  /** Emits on version change */
  readonly versionChange = output<string>();
}
