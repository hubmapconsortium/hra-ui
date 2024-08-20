import { provideHttpClient } from '@angular/common/http';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { expect } from '@storybook/jest';
import { within } from '@storybook/testing-library';

import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  component: FooterComponent,
  title: 'FooterComponent',
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), provideIcons()],
    }),
  ],
};
export default meta;
type Story = StoryObj<FooterComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/footer works!/gi)).toBeTruthy();
  },
};
