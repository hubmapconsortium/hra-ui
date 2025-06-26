import { ChangeDetectionStrategy, Component, input, WritableSignal } from '@angular/core';
import { DataViewerComponent, DataViewerVariant, ReleaseVersionData } from '@hra-ui/design-system/data-viewer';
import { CommonModule } from '@angular/common';
import { linkedQueryParam } from 'ngxtension/linked-query-param';

/**
 * Data Viewer with query parameters component
 */
@Component({
  selector: 'hra-data-viewer-with-query-params',
  imports: [CommonModule, DataViewerComponent],
  templateUrl: './data-viewer-with-query-params.component.html',
  styleUrl: './data-viewer-with-query-params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataViewerWithQueryParamsComponent {
  /** Release versions to include in the data viewer*/
  readonly releaseVersionData = input.required<ReleaseVersionData[]>();

  /** Data viewer variant */
  readonly variant = input.required<DataViewerVariant>();

  /** Link to the HRA Organ Icons GitHub repository */
  readonly githubIconsUrl = input.required<string>();

  /** The release version to filter by, from the URL */
  protected readonly releaseVersion = linkedQueryParam('releaseVersion', {
    defaultValue: '',
    preserveFragment: true,
  }) as WritableSignal<string>;

  /** The organ to filter by, from the URL */
  protected readonly organ = linkedQueryParam('organ', {
    defaultValue: 'Kidney',
    preserveFragment: true,
  }) as WritableSignal<string>;
}
