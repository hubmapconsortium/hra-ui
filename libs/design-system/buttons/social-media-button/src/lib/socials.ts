import { createInjectionToken } from 'ngxtension/create-injection-token';
import { SOCIALS } from './static-data/parsed';

/** Injection token for socials */
const SOCIALS_TOKEN = createInjectionToken(() => SOCIALS);

/** Inject the socials */
export const injectSocials = SOCIALS_TOKEN[0];
/** Provide new socials */
export const provideSocials = SOCIALS_TOKEN[1] as (socials: typeof SOCIALS) => ReturnType<(typeof SOCIALS_TOKEN)[1]>;
