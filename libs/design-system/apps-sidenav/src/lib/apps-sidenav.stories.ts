import { provideDesignSystem } from '../../../src/lib/providers';
import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { AppsSidenavComponent } from './apps-sidenav.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AppsSidenavComponent> = {
  component: AppsSidenavComponent,
  title: 'AppsSidenavComponent',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=78-355',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideDesignSystem(), importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppsSidenavComponent>;

export const Primary: Story = {
  args: {},
};
