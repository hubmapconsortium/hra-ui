import { AppsSchema } from '../types/apps.schema';
import RAW_APPS from './apps.json';

const parsedApps = AppsSchema.parse(RAW_APPS);
export const RESEARCHER_USE_APPS = parsedApps.researcherApps.use;
export const RESEARCHER_CONSTRUCT_APPS = parsedApps.researcherApps.construct;
export const DEVELOPER_APPS = parsedApps.developerApps;
