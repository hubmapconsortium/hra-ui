import BrandLogosSchema from '../types/logos.schema';
import RAW_LOGOS from './logos.json';

/** Data for all logos */
export const LOGOS = BrandLogosSchema.parse(RAW_LOGOS).logos;
