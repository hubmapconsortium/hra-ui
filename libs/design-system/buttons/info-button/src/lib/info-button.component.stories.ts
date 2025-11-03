import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InfoButtonComponent } from './info-button.component';

const meta: Meta<InfoButtonComponent> = {
  title: 'Design System/Buttons/Info Button',
  component: InfoButtonComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4763-728&t=yDozZcoDlynGt0D6-1',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, MatIconModule],
    }),
  ],
};
export default meta;

type Story = StoryObj<InfoButtonComponent>;

export const Simple: Story = {
  name: 'Simple Info Button',
  render: () => ({
    template: `
      <hra-info-button>
        <span hraInfoButtonTagline>Information Title</span>
        This is a detailed description that appears in the rich tooltip when you click the info button.
      </hra-info-button>
    `,
  }),
};

export const WithLongDescription: Story = {
  name: 'Info Button with Long Description',
  render: () => ({
    template: `
      <hra-info-button>
        <span hraInfoButtonTagline>Detailed Information</span>
        This is a much longer description that provides comprehensive information about the feature or data. It demonstrates how the rich tooltip can handle larger amounts of text while maintaining readability and proper formatting.
      </hra-info-button>
    `,
  }),
};

export const WithTwoActions: Story = {
  name: 'Info Button with Two Action Buttons',
  render: () => ({
    styles: [
      `.mdc-button.mat-mdc-button.mat-accent {
        font-family: var(--mat-sys-label-medium-font);
      }`,
    ],
    template: `
      <hra-info-button>
        <span hraInfoButtonTagline>Information Title</span>

        This rich tooltip includes two action buttons that can be used for interactive features.

        <div hraInfoButtonActions>
          <button mat-button color="accent">Action</button>
          <button mat-button color="accent">Action</button>
        </div>
      </hra-info-button>
    `,
  }),
};
