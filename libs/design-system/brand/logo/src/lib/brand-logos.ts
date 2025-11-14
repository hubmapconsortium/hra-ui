import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Default logos for applications */
export const DEFAULT_LOGOS: BrandLogo[] = [
  {
    size: 'regular',
    src: 'assets/brand/logo/regular.svg',
    width: 178,
    height: 74,
  },
  {
    size: 'small',
    src: 'assets/brand/logo/small.svg',
    width: 116,
    height: 48,
  },
];

export type BrandLogoSize = 'regular' | 'small';

export interface BrandLogo {
  /** Logo size */
  size: BrandLogoSize;
  /** Logo source url */
  src: string;
  /** Logo width */
  width: number;
  /** Logo height */
  height: number;
}

/** Injection token for brand logos configuration */
const BRAND_LOGOS = createInjectionToken(() => ({ logos: DEFAULT_LOGOS }));

/** Inject the brand logos configuration */
export const injectBrandLogos = BRAND_LOGOS[0];

/** Set the brand logos configuration */
export const provideBrandLogos = BRAND_LOGOS[1];
