import { SocialsSchema } from '../types/social-media.schema';
import RAW_SOCIALS from './social-media.json';
import RAW_CNS_SOCIALS from './cns-social-media.json';

/** Parsed social media items */
export const SOCIALS = SocialsSchema.parse(RAW_SOCIALS).socials;
/** All available social ids */
export const SOCIAL_IDS = SOCIALS.map(({ id }) => id);

/** Parsed CNS social media items */
export const CNS_SOCIALS = SocialsSchema.parse(RAW_CNS_SOCIALS).socials;
/** All available CNS social ids */
export const CNS_SOCIAL_IDS = CNS_SOCIALS.map(({ id }) => id);
