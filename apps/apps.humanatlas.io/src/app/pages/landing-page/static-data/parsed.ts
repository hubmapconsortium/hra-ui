import { AppsSchema } from '../types/apps.schema';
import RAW_APPS from './apps.json';

export const APPS = AppsSchema.parse(RAW_APPS).apps;
