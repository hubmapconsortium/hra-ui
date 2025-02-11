import { provideRouter, Routes } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';

/** Route that immediately cancels all navigation attempts */
const ROUTES: Routes = [
  {
    path: '**',
    canActivate: [() => false],
    loadComponent: () => Promise.reject(''),
  },
];

const SAMPLE_CRUMB = { name: 'Link', route: 'A/B/C' };

const meta: Meta<BreadcrumbsComponent> = {
  component: BreadcrumbsComponent,
  title: 'Design System/Buttons/Breadcrumbs',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=892-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter(ROUTES)],
    }),
  ],
};
export default meta;
type Story = StoryObj<BreadcrumbsComponent>;

export const Short: Story = {
  args: {
    crumbs: [SAMPLE_CRUMB, { name: 'Current Page' }],
  },
};

export const Long: Story = {
  args: {
    crumbs: [SAMPLE_CRUMB, SAMPLE_CRUMB, SAMPLE_CRUMB, { name: 'Current Page' }],
  },
};
