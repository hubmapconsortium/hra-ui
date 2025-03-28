import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { SectionLinkComponent } from './section-link.component';

const meta: Meta<SectionLinkComponent> = {
  component: SectionLinkComponent,
  title: 'Design System/Content Template/SectionLink',
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
    tagline: 'Heading',
    size: 1,
  },
  render: (args) => ({
    props: args,
  }),
};

export default meta;
type Story = StoryObj<SectionLinkComponent>;

export const Primary: Story = {};
