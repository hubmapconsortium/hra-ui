import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { RichTooltipModule } from '@hra-ui/design-system/tooltips/rich-tooltip';
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
      imports: [MatButtonModule, MatIconModule, RichTooltipModule],
    }),
  ],
};
export default meta;

type Story = StoryObj<InfoButtonComponent>;

export const Simple: Story = {
  name: 'Simple Info Button',
  render: () => ({
    template: `
      <hra-info-button
        richTooltipTagline="Information Title"
        richTooltipDescription="This is a detailed description that appears in the rich tooltip when you click the info button.">
      </hra-info-button>
    `,
  }),
};

export const WithLongDescription: Story = {
  name: 'Info Button with Long Description',
  render: () => ({
    template: `
      <hra-info-button
        richTooltipTagline="Detailed Information"
        richTooltipDescription="This is a much longer description that provides comprehensive information about the feature or data. It demonstrates how the rich tooltip can handle larger amounts of text while maintaining readability and proper formatting.">
      </hra-info-button>
    `,
  }),
};

export const WithTwoActions: Story = {
  name: 'Info Button with Two Action Buttons',
  render: () => ({
    styles: [
      `::ng-deep .mdc-button.mat-mdc-button.mat-accent {
        font-family: var(--mat-sys-label-medium-font);
      }`,
    ],
    template: `
      <hra-rich-tooltip-container #content>
        <hra-rich-tooltip-tagline>
          Information Title
        </hra-rich-tooltip-tagline>
        <hra-rich-tooltip-content>
          This rich tooltip includes two action buttons that can be used for interactive features.
        </hra-rich-tooltip-content>
        <hra-rich-tooltip-actions>
          <button mat-button color="accent">Action</button>
          <button mat-button color="accent">Action</button>
        </hra-rich-tooltip-actions>
      </hra-rich-tooltip-container>

      <hra-info-button [richTooltipContent]="content"></hra-info-button>
    `,
  }),
};
