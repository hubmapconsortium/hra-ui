import { Png, Svg } from './builtin-formats-ids';
import { DownloadFormat } from './download.model';

/**
 * SVG DEFAULT FORMAT
 */
export const SVG_FORMAT: DownloadFormat = {
  id: Svg,
  label: 'Download SVG',
  extension: '.svg',
};

/**
 * PNG DEFAULT FORMAT
 */
export const PNG_FORMAT: DownloadFormat = {
  id: Png,
  label: 'Download PNG',
  extension: '.png',
};

// TODO add new formats: ai
