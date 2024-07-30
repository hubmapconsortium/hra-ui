import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ScrollingModule, provideScrolling } from '../scrolling.module';
import { ScrollOverflowFadeDirective } from './scroll-overflow-fade.directive';

function generateContent(length: number): string {
  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tortor odio, aliquet eget velit ut, suscipit ultrices ipsum. Nunc consequat, felis quis dignissim tincidunt, mauris eros scelerisque turpis, sed feugiat ex est eu felis. In hac habitasse platea dictumst. Donec volutpat orci id sapien hendrerit, eget consequat leo faucibus. Quisque euismod dolor lacus. Aliquam malesuada lacus eu nulla interdum aliquam. Proin consectetur nibh sed mi gravida ornare. Donec sit amet scelerisque turpis. Maecenas felis libero, rutrum eget lobortis eu, lacinia ac libero. Cras nec nibh sed justo commodo faucibus.`;
  const paragraph = `<p>${content}</p>`;
  return Array(length).fill(paragraph).join('\n');
}

const meta: Meta<ScrollOverflowFadeDirective> = {
  component: ScrollOverflowFadeDirective,
  title: 'ScrollOverflowFade',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=214-1697',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideScrolling()],
    }),
    moduleMetadata({
      imports: [ScrollingModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ng-scrollbar hraScrollOverflowFade>
        <div class="content">
        <h1>Scroll Me!</h1>
          ${generateContent(5)}
        </div>
      </ng-scrollbar>
    `,
    styles: [
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
  }),
};
export default meta;
type Story = StoryObj<ScrollOverflowFadeDirective>;

export const Primary: Story = {
  args: {},
};
