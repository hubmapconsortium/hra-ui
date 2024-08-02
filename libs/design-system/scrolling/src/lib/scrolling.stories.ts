import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { ScrollingModule, provideScrolling } from './scrolling.module';

const loremIpsum = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Etiam tortor odio, aliquet eget velit ut, suscipit ultrices ipsum.
Nunc consequat, felis quis dignissim tincidunt, mauris eros scelerisque turpis, sed feugiat ex est eu felis.
In hac habitasse platea dictumst.
Donec volutpat orci id sapien hendrerit, eget consequat leo faucibus.
Quisque euismod dolor lacus.
Aliquam malesuada lacus eu nulla interdum aliquam.
Proin consectetur nibh sed mi gravida ornare.
Donec sit amet scelerisque turpis.
Maecenas felis libero, rutrum eget lobortis eu, lacinia ac libero.
Cras nec nibh sed justo commodo faucibus.`;

function generateContent(length: number): string {
  const paragraph = `<p>${loremIpsum}</p>`;
  return Array(length).fill(paragraph).join('\n');
}

export const utils = {
  generateContent,
  sharedContentTemplate: `
    <div class="content">
      <h1>Scroll Me!</h1>
      ${generateContent(5)}
    </div>
  `,
  sharedDecorators: [
    applicationConfig({
      providers: [provideScrolling()],
    }),
    moduleMetadata({
      imports: [ScrollingModule],
    }),
  ],
  sharedStyles: [
    `ng-scrollbar {
      --scrollbar-offset: 4;
      border: 1px solid black;
      border-radius: 4px;
      width: 332px;
      height: 400px;
    }`,
    `.content {
      width: 300px;
      padding: 16px;
    }`,
  ],
} as const;

const meta: Meta<NgScrollbar> = {
  component: NgScrollbar,
  title: 'Scrollbar',
  excludeStories: ['utils'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=214-1253',
    },
  },
  decorators: [...utils.sharedDecorators],
};

export default meta;
type Story = StoryObj<NgScrollbar>;

function renderWithThickness(thickness: number): Story['render'] {
  return (args) => ({
    props: args,
    template: `
      <ng-scrollbar>
        ${utils.sharedContentTemplate}
      </ng-scrollbar>
    `,
    styles: [
      ...utils.sharedStyles,
      `ng-scrollbar {
        --scrollbar-thickness: ${thickness};
      }`,
    ],
  });
}

export const Default: Story = {
  args: {},
  render: renderWithThickness(8),
};

export const Large: Story = {
  args: {},
  render: renderWithThickness(12),
};
