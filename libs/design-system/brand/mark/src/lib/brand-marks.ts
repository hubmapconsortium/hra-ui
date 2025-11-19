import { createInjectionToken } from 'ngxtension/create-injection-token';

/** Default marks for applications */
export const DEFAULT_MARKS: BrandMark[] = [
  {
    variant: 'default',
    src: 'assets/brand/mark/default.svg',
    width: 226,
    height: 226,
  },
  {
    variant: 'contrast',
    src: 'assets/brand/mark/contrast.svg',
    width: 226,
    height: 226,
  },
  {
    variant: 'small',
    src: 'assets/brand/mark/small.svg',
    width: 40,
    height: 40,
  },
];

/** Brand mark variant */
export type BrandMarkVariant = 'default' | 'contrast' | 'small';

/** Brand mark */
export interface BrandMark {
  /** Mark variant */
  variant: BrandMarkVariant;
  /** Mark source url */
  src: string;
  /** Mark width */
  width: number;
  /** Mark height */
  height: number;
}

/** Injection token for brand marks configuration */
const BRAND_MARKS = createInjectionToken(() => DEFAULT_MARKS);

/** Inject the brand marks configuration */
export const injectBrandMarks = BRAND_MARKS[0];

/** Set the brand marks configuration */
export const provideBrandMarks = BRAND_MARKS[1] as (marks: BrandMark[]) => ReturnType<(typeof BRAND_MARKS)[1]>;
