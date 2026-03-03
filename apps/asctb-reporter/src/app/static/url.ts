import { environment } from '../../environments/environment';
import { Sheet } from '../models/sheet.model';

export const URL = environment.asctbApiUrl;

export const PLAYGROUND = 'playground/sheet.csv';

export function getAssetsURL(dataVersion: string, currentSheet: Sheet) {
  return `data/${dataVersion}/${currentSheet.name}.csv`;
}
