import { MatIconModule } from '@angular/material/icon';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ButtonModule } from '@hra-ui/design-system/button';
import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from './expansion-panel.component';

const meta: Meta = {
  title: 'ExpansionPanel',
  decorators: [
    moduleMetadata({
      imports: [
        MatIconModule,
        ButtonModule,
        ExpansionPanelActionsComponent,
        ExpansionPanelComponent,
        ExpansionPanelHeaderContentComponent,
      ],
    }),
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <hra-expansion-panel [title]="'Title'">
        <hra-expansion-panel-actions>
          <button mat-icon-button>
            <mat-icon class="material-symbols-rounded">
              more_vert
            </mat-icon>
          </button>
        </hra-expansion-panel-actions>
        <hra-expansion-panel-header-content>
          Additional Actions
        </hra-expansion-panel-header-content>
        Actual Content
      </hra-expansion-panel>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
