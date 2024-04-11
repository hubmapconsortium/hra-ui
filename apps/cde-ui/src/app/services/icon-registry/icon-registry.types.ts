import { IconOptions } from '@angular/material/icon';

/**
 * Base Interface for Icon Registry Methods
 */
export interface BaseSvgIconDef {
  /** Name for the icon */
  name?: string;
  /** Namespace for the icon */
  namespace?: string;
  /** Options for the icon */
  options?: IconOptions;
}

/**
 * Interface for Icon registry method only with URL
 */
export interface UrlSvgIconDef extends BaseSvgIconDef {
  /** Path of the svg icon */
  url: string;
  /** SVG source of the icon */
  literal?: never;
}

/**
 * Interface for Icon registry method only with literal
 */
export interface LiteralSvgIconDef extends BaseSvgIconDef {
  /** SVG source of the icon */
  literal: string;
  /** Path of the svg icon */
  url?: never;
}

/**
 * Interface for Icon registry method
 */
export type SvgIconDef = UrlSvgIconDef | LiteralSvgIconDef;
