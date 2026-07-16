import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Brand logo size */
export type BrandLogoSize = 'regular' | 'small';

/** Brand logo */
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

/** Brand logos configuration */
export interface BrandLogosConfig {
  /** Label for the brand */
  label: string;
  /** URL for the brand website */
  url: string;
  /** Array of brand logos */
  logos: BrandLogo[];
}

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

/** Default brand logos configuration */
export const DEFAULT_BRAND_LOGOS_CONFIG: BrandLogosConfig = {
  label: 'Human Reference Atlas',
  url: 'https://humanatlas.io',
  logos: DEFAULT_LOGOS,
};

/** Injection token for brand logos configuration */
const BRAND_LOGOS = createInjectionToken(() => DEFAULT_BRAND_LOGOS_CONFIG);

/** Inject the brand logos configuration */
export const injectBrandLogos = BRAND_LOGOS[0];

/** Set the brand logos configuration */
export const provideBrandLogos = BRAND_LOGOS[1] as (config: BrandLogosConfig) => ReturnType<(typeof BRAND_LOGOS)[1]>;
