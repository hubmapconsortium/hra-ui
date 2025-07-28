import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { watchBreakpoint } from '@hra-ui/cdk/breakpoints';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { providePageSectionNavigation } from '@hra-ui/design-system/content-templates/page-section';
import { MenuOptionsType, TableColumn, TableComponent, TableRow } from '@hra-ui/design-system/table';

import { VersionSelectorComponent } from '../version-selector/version-selector.component';

/** Metadata layout header */
@Component({
  selector: 'hra-metadata-layout-header',
  template: `<ng-content />`,
  styles: ['::ng-deep h1 > mat-divider { display: none !important; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutHeaderComponent {}

@Component({
  selector: 'hra-metadata-layout-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutContentComponent {}

/** Metadata layout */
@Component({
  selector: 'hra-metadata-layout',
  imports: [HraCommonModule, TableComponent, VersionSelectorComponent, MatMenuModule, MatIconModule, ButtonsModule],
  templateUrl: './metadata-layout.component.html',
  styleUrl: './metadata-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePageSectionNavigation()],
})
export class MetadataLayoutComponent {
  private readonly http = inject(HttpClient);

  /** Whether the screen width is currently greater than or equal to 1100px */
  protected isWideScreen = watchBreakpoint('(min-width: 1100px)');

  protected isSmallScreen = watchBreakpoint('(max-width: 639px)');

  readonly rows = input.required<TableRow[]>();
  readonly columns = input.required<TableColumn[]>();
  readonly version = input.required<string>();
  readonly availableVersions = input.required<string[]>();
  readonly downloadOptions = input.required<MenuOptionsType[]>();
  readonly versionChange = output<string>();

  /**
   * Downloads file
   * @param url Download url
   * @param id File name to save as
   */
  saveFile(url: string, id: string) {
    //TODO: replace with service
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = id;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
