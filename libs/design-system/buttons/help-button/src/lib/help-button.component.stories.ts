import { provideDesignSystem } from '@hra-ui/design-system';
import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { HelpButtonComponent } from './help-button.component';
import { MatMenuModule } from '@angular/material/menu';

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
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
};
export default meta;

type Story = StoryObj<HelpButtonComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <hra-help-button [action]="'https://humanatlas.io/overview-training-outreach#introduction'"></hra-help-button>
    `,
  }),
};

export const AsLink: Story = {
  render: () => ({
    template: `
      <hra-help-button [action]="'https://humanatlas.io/overview-training-outreach#introduction'"></hra-help-button>
    `,
  }),
};

export const AsMenu: Story = {
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
