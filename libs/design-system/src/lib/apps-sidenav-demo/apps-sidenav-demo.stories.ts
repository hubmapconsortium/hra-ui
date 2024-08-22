import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavHeaderComponent } from '@hra-ui/design-system/nav-header';
import { Meta, StoryObj, applicationConfig, moduleMetadata } from '@storybook/angular';
import { provideDesignSystem } from '../providers';
import { AppsSidenavDemoComponent } from './apps-sidenav-demo.component';

const meta: Meta<AppsSidenavDemoComponent> = {
  component: AppsSidenavDemoComponent,
  title: 'AppsSidenavDemoComponent',
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
    moduleMetadata({
      imports: [NavHeaderComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<AppsSidenavDemoComponent>;

export const Primary: Story = {};
