import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';
import { SkipToContentButtonComponent } from './skip-to-content-button.component';

const meta: Meta<SkipToContentButtonComponent> = {
  component: SkipToContentButtonComponent,
  title: 'Design System/Navigation/SkipToContentButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/AtlasNG-Components?node-id=6668-345',
    },
  },
  args: {
    anchorId: 'main-content',
    label: 'Skip to main content',
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-skip-to-content-button ${argsToTemplate(args)} />
      <main id="main-content">
        <h1>Main content</h1>
        <p>Press Enter on the skip link to move focus here.</p>
      </main>
    `,
  }),
};

export default meta;
type Story = StoryObj<SkipToContentButtonComponent>;

export const Primary: Story = {};
