import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { CodeBlockComponent } from './code-block.component';

/**
 * Metadata of the CodeBlockComponent.
 */
const meta: Meta = {
  title: 'CodeBlockComponent',
  component: CodeBlockComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=8607-29904&t=liDlwupj5RSoj2Mb-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;
type Story = StoryObj<CodeBlockComponent>;

/**
 * Default story of the CodeBlockComponent.
 */
export const Default: Story = {
  args: {
    code: `import { provideHighlightOptions } from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'), // Optional, add line numbers if needed
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml')
      },
      themePath: 'path-to-theme.css' // Optional, useful for dynamic theme changes
    })
  ]
};`,
    language: 'typescript',
  },
};
