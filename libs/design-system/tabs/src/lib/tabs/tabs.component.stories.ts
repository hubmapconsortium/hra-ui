import { MatTabsModule } from '@angular/material/tabs';
import { Meta, StoryObj } from '@storybook/angular';

const meta: Meta = {
  render: () => ({
    moduleMetadata: {
      imports: [MatTabsModule],
    },

    template: `
    <mat-tab-group>
      <mat-tab label="Tab 1">
        Tab 1 Content
      </mat-tab>
      <mat-tab label="Tab 2">
        Tab 2 Content
      </mat-tab>
      <mat-tab label="Tab 3">
         Tab 3 Content
      </mat-tab>
    </mat-tab-group>
    `,
  }),
  title: 'Design System/Tabs',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6126-21931',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
