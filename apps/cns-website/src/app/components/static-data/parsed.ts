import { SocialsSchema } from '@hra-ui/design-system/buttons/social-media-button';
import RAW_CNS_SOCIALS from './cns-social-media.json';

/** Parsed CNS social media items */
export const CNS_SOCIALS = SocialsSchema.parse(RAW_CNS_SOCIALS).socials;
/** All available CNS social ids */
export const CNS_SOCIAL_IDS = CNS_SOCIALS.map(({ id }) => id);
