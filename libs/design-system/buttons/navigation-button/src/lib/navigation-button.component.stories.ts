import { MatIconModule } from '@angular/material/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { NavigationButtonComponent } from './navigation-button.component';
import { NavigationIconDirective } from './navigation-icon.directive';
import { NavigationButtonDescriptionDirective } from './navigation-button-description.directive';
import { NavigationButtonTaglineDirective } from './navigation-button-tagline.directive';

const meta: Meta<NavigationButtonComponent> = {
  title: 'Design System/Buttons/Navigation Button',
  component: NavigationButtonComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=4878-235&p=f',
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        NavigationButtonComponent,
        NavigationIconDirective,
        NavigationButtonDescriptionDirective,
        NavigationButtonTaglineDirective,
        MatIconModule,
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['cta', 'basic'],
    },
  },
  args: {
    link: '#',
    variant: 'basic',
    indented: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <hra-navigation-button [link]="link" [variant]="variant" [indented]="indented">
        <mat-icon hraNavigationIcon="leading">info</mat-icon>
        <span hraNavigationButtonTagline>Label text</span>
        <span hraNavigationButtonDescription>Supporting text</span>
        <mat-icon hraNavigationIcon>arrow_right_alt</mat-icon>
      </hra-navigation-button>
    `,
  }),
};
export default meta;
type Story = StoryObj<NavigationButtonComponent>;

export const Default: Story = {};

export const LongSupportingText: Story = {
  render: (args) => ({
    props: args,
    template: `
      <hra-navigation-button [link]="link" [variant]="variant" [indented]="indented">
        <mat-icon hraNavigationIcon="leading">info</mat-icon>
        <span hraNavigationButtonTagline>Label text</span>
        <span hraNavigationButtonDescription>
          This is a very long supporting text that demonstrates how the navigation button component handles text wrapping when the content exceeds the available width. It should wrap gracefully to multiple lines while maintaining proper spacing and alignment.
        </span>
        <mat-icon hraNavigationIcon>arrow_right_alt</mat-icon>
      </hra-navigation-button>
    `,
  }),
};
