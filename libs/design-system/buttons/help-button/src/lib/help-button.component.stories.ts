import { MatMenuModule } from '@angular/material/menu';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { HelpButtonComponent } from './help-button.component';

const meta: Meta<HelpButtonComponent> = {
  title: 'Design System/Buttons/Help Button',
  component: HelpButtonComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=333-4',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [MatMenuModule],
    }),
  ],
};
export default meta;

type Story = StoryObj<HelpButtonComponent>;

export const WithUrl: Story = {
  render: () => ({
    template: `
      <hra-help-button [action]="'https://humanatlas.io/overview-training-outreach#introduction'"></hra-help-button>
    `,
  }),
};

export const WithMenu: Story = {
  render: () => ({
    template: `
      <mat-menu #helpMenu="matMenu">
        <button mat-menu-item>Option 1</button>
        <button mat-menu-item>Option 2</button>
        <button mat-menu-item>Option 3</button>
      </mat-menu>

      <hra-help-button [action]="helpMenu"></hra-help-button>
    `,
  }),
};
