import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { FullscreenContentComponent } from './fullscreen-content.component';
import { FullscreenContainerComponent } from './fullscreen-container.component';

export default {
  title: 'FullscreenContainerComponent',
  component: FullscreenContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [FullscreenContentComponent],
    }),
  ],
} as Meta<FullscreenContainerComponent>;

const Template =
  (content: string): StoryFn<FullscreenContainerComponent> =>
  (args) => ({
    props: args,
    template: `
    <ftu-fullscreen-container [fullscreen]="fullscreen">
      ${content}
    </ftu-fullscreen-container>
  `,
  });

export const Default = Template(`
  Some content
  <ftu-fullscreen-content>
    Other content
  </ftu-fullscreen-content>
`);
