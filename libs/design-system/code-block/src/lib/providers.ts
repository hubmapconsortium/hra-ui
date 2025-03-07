import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideStyleComponents } from '@hra-ui/cdk/styling';
import { provideHighlightOptions } from 'ngx-highlightjs';
import { CodeBlockGlobalStylesComponent } from './global-styles.component';

export function provideCodeBlock(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
      },
    }),
    provideStyleComponents(CodeBlockGlobalStylesComponent),
  ]);
}
