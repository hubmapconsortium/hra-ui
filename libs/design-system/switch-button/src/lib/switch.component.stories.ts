import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideDesignSystem } from '@hra-ui/design-system';
import { SwitchComponent } from './switch.component';

const meta: Meta<SwitchComponent> = {
  component: SwitchComponent,
  title: 'Switch Component',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=10842-16912',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatSlideToggleModule],
    }),
  ],
  argTypes: {
    isChecked: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    hideIcon: { control: 'boolean' },
  },
  args: {
    isChecked: true,
    isDisabled: false,
    hideIcon: false,
  },
};

export default meta;

type Story = StoryObj<SwitchComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hra-switch-button
        [(isChecked)]="isChecked"
        [isDisabled]="isDisabled"
        [hideIcon]="hideIcon">
      </hra-switch-button>
    `,
  }),
};
