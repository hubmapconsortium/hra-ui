import { moduleMetadata } from '@storybook/angular';
import { Meta, StoryFn } from '@storybook/angular';
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
    <hra-fullscreen-container [fullscreen]="fullscreen">
      ${content}
    </hra-fullscreen-container>
  `,
  });

export const Default = Template(`
  Some content
  <hra-fullscreen-content>
    Other content
  </hra-fullscreen-content>
`);
