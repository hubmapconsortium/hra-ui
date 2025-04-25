import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { provideRouter, Route, RouterModule } from '@angular/router';
import { TableOfContentsDemoComponent } from './table-of-contents-demo.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: TableOfContentsDemoComponent,
  },
];

const meta: Meta<TableOfContentsDemoComponent> = {
  component: TableOfContentsDemoComponent,
  title: 'Design System/Navigation/Table of Contents/Table of Contents Demo',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/gQEMLugLjweDvbsNNUVffD/HRA-Design-System-Repository?node-id=7632-22566&t=hb4zN0Dq78X9iuuM-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter(ROUTES)],
    }),
    moduleMetadata({
      imports: [RouterModule],
    }),
  ],
  render: (args) => ({
    props: args,
    template: '<router-outlet />',
  }),
};

export default meta;
type Story = StoryObj<TableOfContentsDemoComponent>;

export const Primary: Story = {};
