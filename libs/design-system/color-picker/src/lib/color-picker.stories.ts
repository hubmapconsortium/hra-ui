import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ColorPickerComponent } from './color-picker.component';

const meta: Meta = {
  component: ColorPickerComponent,
  title: 'ColorPickerComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Explorer-Components?node-id=1117-10518',
    },
  },
  decorators: [
    applicationConfig({
      providers: [],
    }),
    moduleMetadata({
      imports: [ColorPickerDirective],
    }),
  ],
  args: {
    color: [170, 220, 223],
  },
  render: (args) => ({
    props: args,
  }),
};
export default meta;
type Story = StoryObj<ColorPickerComponent>;

export const Primary: Story = {};
