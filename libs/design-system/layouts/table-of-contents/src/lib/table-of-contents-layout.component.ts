import { ChangeDetectionStrategy, Component } from '@angular/core';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsComponent } from '@hra-ui/design-system/navigation/table-of-contents';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePageSectionNavigation()],
})
export class TableOfContentsLayoutComponent {
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');
}
