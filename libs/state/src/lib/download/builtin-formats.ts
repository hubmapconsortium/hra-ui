import { Csv, Json, Png, Svg } from './builtin-formats-ids';
import { DownloadFormat } from './download.model';

/** SVG DEFAULT FORMAT */
export const SVG_FORMAT: DownloadFormat = {
  id: Svg,
  label: 'Illustration SVG',
  extension: '.svg',
};

/** PNG DEFAULT FORMAT */
export const PNG_FORMAT: DownloadFormat = {
  id: Png,
  label: 'Illustration PNG',
  extension: '.png',
};

/** CSV DEFAULT FORMAT */
export const CSV_FORMAT: DownloadFormat = {
  id: Csv,
  label: 'Source data CSV',
  extension: '.csv',
};

/** JSON DEFAULT FORMAT */
export const JSON_FORMAT: DownloadFormat = {
  id: Json,
  label: 'Source data biomarker expressions JSON',
  extension: '.json',
};

// TODO add new formats: ai
