// Global type declarations for vega-embed
declare module 'vega-embed' {
  import { View } from 'vega';
  import { TopLevelSpec } from 'vega-lite';

  export interface EmbedOptions {
    actions?: boolean | object;
    theme?: string;
    defaultStyle?: boolean;
    renderer?: 'canvas' | 'svg';
    tooltip?: object | boolean;
    patch?: object;
    width?: number;
    height?: number;
    padding?: object | number;
    scaleFactor?: number;
    config?: object;
    sourceHeader?: string;
    sourceFooter?: string;
    editorUrl?: string;
    downloadFileName?: string;
  }

  export interface Result {
    view: View;
    spec: TopLevelSpec;
    vgSpec: object;
    finalize: () => void;
  }

  export type VisualizationSpec = TopLevelSpec;

  export default function embed(el: HTMLElement | string, spec: TopLevelSpec, options?: EmbedOptions): Promise<Result>;
}
