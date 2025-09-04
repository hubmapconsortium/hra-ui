// Type declarations for vega-embed to ensure compatibility across environments
declare module 'vega-embed' {
  import { View } from 'vega';

  export interface Result {
    view: View;
    spec: unknown;
    vgSpec: unknown;
    embedOptions: EmbedOptions;
    finalize: () => void;
  }

  export interface EmbedOptions {
    actions?:
      | boolean
      | {
          export?: boolean | { svg?: boolean; png?: boolean };
          source?: boolean;
          compiled?: boolean;
          editor?: boolean;
        };
    mode?: string;
    theme?: string;
    renderer?: string;
    logLevel?: number;
    tooltip?: unknown;
    loader?: unknown;
    hover?: boolean;
    container?: HTMLElement;
    defaultStyle?: boolean;
    width?: number;
    height?: number;
    padding?: unknown;
    background?: string;
    config?: unknown;
    patch?: unknown;
    autosize?: unknown;
    expr?: unknown;
    ast?: boolean;
    i18n?: unknown;
  }

  export type VisualizationSpec = unknown;

  declare function embed(
    el: HTMLElement | string,
    spec: VisualizationSpec | string,
    opts?: EmbedOptions,
  ): Promise<Result>;

  export default embed;
  export { embed };
}
