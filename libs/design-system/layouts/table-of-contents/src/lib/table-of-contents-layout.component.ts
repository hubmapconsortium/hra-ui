import { ChangeDetectionStrategy, Component, inject, InjectionToken, Provider } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsComponent } from '@hra-ui/design-system/navigation/table-of-contents';

/** Table of contents layout options */
export interface TableOfContentsLayoutOptions {
  /** Media query at which the table of contents moves into a side column beside the page content */
  sideColumnQuery: string;
}

/** Injection token for table of contents layout options */
export const TABLE_OF_CONTENTS_LAYOUT_OPTIONS = new InjectionToken<TableOfContentsLayoutOptions>(
  'TableOfContentsLayoutOptions',
  {
    providedIn: 'root',
    factory: () => ({ sideColumnQuery: '(min-width: 1100px)' }),
  },
);

/**
 * Provides table of contents layout options
 *
 * @param options Table of contents layout options
 * @returns A provider for the options
 */
export function provideTableOfContentsLayoutOptions(options: TableOfContentsLayoutOptions): Provider {
  return { provide: TABLE_OF_CONTENTS_LAYOUT_OPTIONS, useValue: options };
}

/** Table of contents layout header */
@Component({
  selector: 'hra-table-of-contents-layout-header',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsLayoutHeaderComponent {}

/** Table of contents layout */
@Component({
  selector: 'hra-table-of-contents-layout',
  imports: [HraCommonModule, TableOfContentsComponent],
  templateUrl: './table-of-contents-layout.component.html',
  styleUrl: './table-of-contents-layout.component.scss',
  providers: [providePageSectionNavigation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hra-table-of-contents-layout-side-column]': 'isWideScreen()',
  },
})
export class TableOfContentsLayoutComponent {
  /** Whether the screen matches the side column query (1100px and up by default) */
  protected isWideScreen = watchBreakpoint(inject(TABLE_OF_CONTENTS_LAYOUT_OPTIONS).sideColumnQuery);
}
