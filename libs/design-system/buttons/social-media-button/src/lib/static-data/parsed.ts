import { SocialsSchema } from '../types/social-media.schema';
import RAW_SOCIALS from './social-media.json';

export const SOCIALS = SocialsSchema.parse(RAW_SOCIALS).socials;
export const SOCIAL_IDS = SOCIALS.map(({ id }) => id);
