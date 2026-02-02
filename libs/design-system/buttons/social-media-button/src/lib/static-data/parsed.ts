import { SocialsSchema } from '../types/social-media.schema';
import RAW_SOCIALS from './social-media.json';

/** Parsed social media items */
export const SOCIALS = SocialsSchema.parse(RAW_SOCIALS).socials;
/** All available social ids */
export const SOCIAL_IDS = SOCIALS.map(({ id }) => id);
