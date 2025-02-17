import FundersSchema from '../types/funders.schema';
import RAW_FUNDERS from './funders.json';

/** Parsed funders static data */
export const FUNDERS = FundersSchema.parse(RAW_FUNDERS).funders;
/** All available funder ids */
export const FUNDER_IDS = FUNDERS.map(({ id }) => id);
