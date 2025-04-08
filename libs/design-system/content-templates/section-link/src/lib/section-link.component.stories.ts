import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { SectionLinkComponent } from './section-link.component';

interface ExtraArgs {
  text: string;
}

const meta: Meta<SectionLinkComponent & ExtraArgs> = {
  component: SectionLinkComponent,
  title: 'Design System/Content Templates/SectionLink',
  decorators: [
    moduleMetadata({
      imports: [SectionLinkComponent, ButtonsModule, MatIconModule],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2355-1046',
    },
  },
  args: {
    level: 1,
    anchor: 'anchor',
    underlined: false,
    text: 'Section Link',
  },
  render: (args) => ({
    props: args,
    styles: ['.hra-app { margin: 0 2rem; }'],
    template: `<hra-section-link level="${args.level}" anchor="${args.anchor}" underlined="${args.underlined}">
        ${args.text}
      </hra-section-link>`,
  }),
};

export default meta;
type Story = StoryObj<SectionLinkComponent & ExtraArgs>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
  },
};

export const Underlined: Story = {
  args: {
    underlined: true,
  },
};
