import { applicationConfig, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideDesignSystem } from '@hra-ui/design-system';
import { ErrorPagesModule } from '@hra-ui/design-system/error-pages';
import { provideRouter, Routes } from '@angular/router';

/** Route that immediately cancels all navigation attempts */
const ROUTES: Routes = [
  {
    path: '**',
    canActivate: [() => false],
    loadComponent: () => Promise.reject(''),
  },
];

const meta: Meta = {
  title: 'Design System/Error Pages/Not Found Page',
  decorators: [
    moduleMetadata({
      imports: [ErrorPagesModule],
    }),
    applicationConfig({
      providers: [provideDesignSystem(), provideRouter(ROUTES)],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <hra-not-found-page></hra-not-found-page>
    `,
  }),
};
export default meta;
type Story = StoryObj;

export const Default: Story = {};
