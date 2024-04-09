import { IconOptions } from '@angular/material/icon';

export interface BaseSvgIconDef {
  name?: string;
  namespace?: string;
  options?: IconOptions;
}

export interface UrlSvgIconDef extends BaseSvgIconDef {
  url: string;
  literal?: never;
}

export interface LiteralSvgIconDef extends BaseSvgIconDef {
  literal: string;
  url?: never;
}

export type SvgIconDef = UrlSvgIconDef | LiteralSvgIconDef;
