import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { MatIconModule } from '@angular/material/icon';
import { PageSectionComponent } from './page-section.component';

const meta: Meta<PageSectionComponent> = {
  component: PageSectionComponent,
  title: 'Design System/Content Templates/Page Section',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2568-226',
    },
  },
  args: {
    tagline: 'Page label',
    level: 1,
    anchor: 'page-label',
  },
  decorators: [
    moduleMetadata({
      imports: [MatIconModule, ButtonsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<PageSectionComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<hra-page-section tagline="${args.tagline}" level="${args.level}" anchor="${args.anchor}">
      This is placeholder text. We should try to keep this short. When writing content, imagine you've never been to the HRA before. What would you want to learn here?
      <ul>
        <li>Components may be swapped out for this button set</li>
        <li>Other components may be swapped out for the button set.</li>
      </ul>
      <button mat-button hraCtaButton >
        Action
        <mat-icon iconPositionEnd>arrow_forward</mat-icon>
      </button>
    </hra-page-section>`,
    styles: ['.hra-app { margin: 0 2rem; }', 'ul { margin: 0;  margin-bottom: 1.5rem;}'],
  }),
};
