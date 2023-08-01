import { Selector } from '@ngxs/store';
import { DownloadFormat, DownloadModel } from './download.model';
import { DownloadState } from './download.state';

/**
 * Available format selectors
 */
export class DownloadSelectors {
  /**
   * Selectors available format for download selectors
   * @param state
   * @returns
   */
  @Selector([DownloadState])
  static formats(state: DownloadModel): DownloadFormat[] {
    const { formats, entries } = state;
    const hasData = (format: DownloadFormat | undefined): format is DownloadFormat =>
      !!(format && format.id in entries);
    return Object.values(formats).filter(hasData);
  }
}
