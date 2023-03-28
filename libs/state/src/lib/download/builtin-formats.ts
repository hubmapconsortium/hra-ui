import { Png, Svg } from './builtin-formats-ids';
import { DownloadFormat, DownloadFormatId } from './download.model';

export const SVG_FORMAT: DownloadFormat = {
  id: Svg,
  label: 'Download Svg',
  extension: '.svg',
};

export const PNG_FORMAT: DownloadFormat = {
  id: Png,
  label: 'Download Png',
  extension: '.png',
  fallbacks: [Svg],
};
