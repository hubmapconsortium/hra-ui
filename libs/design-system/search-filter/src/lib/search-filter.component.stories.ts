import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { SearchFilterComponent } from './search-filter.component';

const meta: Meta<SearchFilterComponent> = {
  component: SearchFilterComponent,
  title: 'Design System/Search Filter',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  args: {
    label: 'Search',
    totalCount: 18,
    viewingCount: 18,
  },
};

export default meta;
type Story = StoryObj<SearchFilterComponent>;

export const Default: Story = {
  args: {},
};
