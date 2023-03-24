import { Selector } from '@ngxs/store';
import { DownloadFormat, DownloadModel } from './download.model';

/**
 * Available format selectors
 */
export class DownloadSelectors {
  /**
   * Selectors available format for download selectors
   * @param state
   * @returns
   */
  @Selector()
  static getFormats(state: DownloadModel): DownloadFormat[] {
    return state;
  }
}
