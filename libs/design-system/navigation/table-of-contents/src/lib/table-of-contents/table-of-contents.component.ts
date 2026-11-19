import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  InjectionToken,
  input,
  Provider,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { HraCommonModule } from '@hra-ui/common';
import { FragmentLinkDirective } from '@hra-ui/common/router-ext';
import { PageSectionActivationService, PageSectionService } from '@hra-ui/design-system/content-templates/page-section';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';

/** Table of contents options */
export interface TableOfContentsOptions {
  /** Whether links render as a Material navigation list, like AtlasNG's table of contents */
  navList: boolean;
}

/** Injection token for table of contents options */
export const TABLE_OF_CONTENTS_OPTIONS = new InjectionToken<TableOfContentsOptions>('TableOfContentsOptions', {
  providedIn: 'root',
  factory: () => ({ navList: false }),
});

/**
 * Provides table of contents options
 *
 * @param options Table of contents options
 * @returns A provider for the options
 */
export function provideTableOfContentsOptions(options: TableOfContentsOptions): Provider {
  return { provide: TABLE_OF_CONTENTS_OPTIONS, useValue: options };
}

/**
 * Table of contents component for navigating between different sections on a page
 */
@Component({
  selector: 'hra-table-of-contents',
  imports: [HraCommonModule, MatListModule, MatRippleModule, FragmentLinkDirective, ScrollingModule],
  templateUrl: './table-of-contents.component.html',
  styleUrl: './table-of-contents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hra-table-of-contents-side-column]': 'sideColumn()',
  },
})
export class TableOfContentsComponent {
  /** Title for the table of content */
  readonly tagline = input('On this page');

  /** Whether the table of contents is shown in a side column beside the page content */
  readonly sideColumn = input(false, { transform: booleanAttribute });

  /** Table of contents options */
  protected readonly options = inject(TABLE_OF_CONTENTS_OPTIONS);

  /** All page sections sorted by dom order */
  protected readonly sections = inject(PageSectionService).sortedSections;
  /** Currently active section */
  protected readonly activeSection = inject(PageSectionActivationService).activeSection;
}
