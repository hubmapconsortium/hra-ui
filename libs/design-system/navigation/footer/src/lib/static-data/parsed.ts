import FundersSchema from '../types/funders.schema';
import RAW_FUNDERS from './funders.json';

/** Parsed funders static data */
export const FUNDERS = FundersSchema.parse(RAW_FUNDERS);
