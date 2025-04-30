import { Meta, StoryObj } from '@storybook/angular';
import { SectionLinkComponent } from './section-link.component';

interface ExtraArgs {
  level: number;
  content: string;
}

function clampLevel(level: number): number {
  level = Math.max(level, 1);
  level = Math.min(level, 6);
  return level;
}

const meta: Meta<SectionLinkComponent & ExtraArgs> = {
  component: SectionLinkComponent,
  title: 'Design System/Content Templates/Section Link',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2355-1046',
    },
  },
  args: {
    level: 1,
    anchor: 'anchor',
    underlined: false,
    content: 'Section Link',
  },
  render: (args) => ({
    props: args,
    styles: ['.hra-app { margin: 0 2rem; }'],
    template: `<h${clampLevel(args.level)} hra-section-link anchor="${args.anchor}" underlined="${args.underlined}">
        ${args.content}
      </h${clampLevel(args.level)}>`,
  }),
};

export default meta;
type Story = StoryObj<SectionLinkComponent & ExtraArgs>;

export const Default: Story = {};

export const LongText: Story = {
  args: {
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.',
  },
};

export const Underlined: Story = {
  args: {
    underlined: true,
  },
};
