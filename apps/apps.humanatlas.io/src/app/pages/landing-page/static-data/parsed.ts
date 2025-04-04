import { AppCardsSchema } from '../types/app-cards.schema';
import RAW_APPS from './apps.json';

const parsedApps = AppCardsSchema.parse(RAW_APPS);
export const RESEARCHER_APPS = parsedApps.tabs.find((tab) => tab.name === 'Researcher Apps')?.sections;
export const DEVELOPER_APPS = parsedApps.tabs.find((tab) => tab.name === 'Developer Apps')?.sections;
