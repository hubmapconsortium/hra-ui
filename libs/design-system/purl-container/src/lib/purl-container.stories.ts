import { Meta, StoryObj } from '@storybook/angular';

import { PurlContainerComponent } from './purl-container.component';

const meta: Meta<PurlContainerComponent> = {
  component: PurlContainerComponent,
  title: 'Design System/Purl Container',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Jnsvqp19Flq4UFCmyHfhtz/Human-Reference-Atlas-2025?node-id=4592-174006&t=higccFjHZE4zi3gN-4',
    },
    layout: 'fullscreen',
  },
  args: {
    purl: 'https://example.com/purl',
  },
};

export default meta;
type Story = StoryObj<PurlContainerComponent>;

export const Primary: Story = {};
