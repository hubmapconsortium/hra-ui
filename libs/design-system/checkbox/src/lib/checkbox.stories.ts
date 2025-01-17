import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideDesignSystem } from '@hra-ui/design-system';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { CheckboxSizeDirective } from './checkbox-size/checkbox-size-directive';
import { CheckboxColorDirective } from './checkbox-color/checkbox-color-directive';

const meta: Meta = {
  title: 'Checkbox',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=6791-24001&t=KSPA1HRCXrHUsgVn-4',
    },
  },
  args: {
    size: 'large',
    color: 'red',
    checkColor: 'white',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'large'],
    },
    color: {
      control: 'text',
    },
    checkColor: {
      control: 'text',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem()],
    }),
    moduleMetadata({
      imports: [MatCheckboxModule, CheckboxSizeDirective, CheckboxColorDirective],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <mat-checkbox hraCheckboxSize="${args['size']}" checkboxColor="'${args['color']}'" checkmarkColor="'${args['checkColor']}'"></mat-checkbox>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};
