import BrandMarksSchema from '../types/marks.schema';
import RAW_MARKS from './marks.json';

/** All marks data */
export const MARKS = BrandMarksSchema.parse(RAW_MARKS).marks;
