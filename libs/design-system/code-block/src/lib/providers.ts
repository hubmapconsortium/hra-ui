import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { CodeBlockGlobalStylesComponent } from './global-styles.component';

/** Provide the code block component and its dependencies to highlight code. */
export function provideCodeBlock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        javascript: () => import('highlight.js/lib/languages/javascript'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
        bash: () => import('highlight.js/lib/languages/bash'),
        python: () => import('highlight.js/lib/languages/python'),
      },
    }),
    provideStyleComponents(CodeBlockGlobalStylesComponent),
  ]);
}
