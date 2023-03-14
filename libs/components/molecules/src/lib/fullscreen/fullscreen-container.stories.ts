import { moduleMetadata } from '@storybook/angular';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { FullscreenContentComponent } from './fullscreen-content.component';
import { FullscreenContainerComponent } from './fullscreen-container.component';

export default {
  title: 'Molecule/FullscreenContainerComponent',
  component: FullscreenContainerComponent,
  decorators: [
    moduleMetadata({
      imports: [FullscreenContentComponent],
    }),
  ],
} as Meta<FullscreenContainerComponent>;

const Template =
  (content: string): Story<FullscreenContainerComponent> =>
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
