import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ActionCardActionComponent, ActionCardComponent } from './action-card.component';
import { ActionCardVariant } from './action-card.schema';
import { MatIconModule } from '@angular/material/icon';
import { GridContainerComponent } from '../../../../content-templates/grid-container/src/lib/grid-container.component';

interface WithContent {
  content?: string;
}

const meta: Meta<ActionCardComponent & WithContent> = {
  title: 'Design System/Cards/Action Card',
  component: ActionCardComponent,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1309-2257',
    },
  },
  args: {
    image: 'assets/ui-images/placeholder.png',
    tagline: 'Label',
    subtagline: 'Small label',
    content: 'This is a placeholder one sentence short description and ideally it contains less than 125 characters.',
  },
  decorators: [
    moduleMetadata({
      imports: [ButtonsModule, MatIconModule, ActionCardActionComponent, GridContainerComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ActionCardComponent & WithContent>;

function render(variant: ActionCardVariant, actions: string): Story['render'] {
  return (args) => ({
    props: args,
    template: `<hra-action-card variant="${variant}" [tagline]="tagline" [subtagline]="subtagline" [image]="image" [icons]="icons">
      ${args.content}
      ${actions}
    </hra-action-card>`,
    styles: [
      `
        a {
          font-family: Metropolis;
          font-weight: 500;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0px;
        }
      `,
    ],
  });
}

export const Elevated: Story = {
  render: render(
    'elevated',
    `<hra-action-card-action>
      <button mat-button>
        Action 1
      </button>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <button mat-flat-button>
        Action 2
      </button>
    </hra-action-card-action>`,
  ),
};

export const Flat: Story = {
  render: render(
    'flat',
    `<hra-action-card-action>
      <button mat-button hraCtaButton>
        Action 1
        <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>
      </button>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <button mat-button hraCtaButton hraSecondaryButton>
        Action 2
        <mat-icon iconPositionEnd>arrow_right_alt</mat-icon>
      </button>
    </hra-action-card-action>`,
  ),
};

export const Outlined: Story = {
  render: render(
    'outlined',
    `<hra-action-card-action>
      <a hraHyperlink href="https://google.com">
        Action
      </a>
    </hra-action-card-action>`,
  ),
};

export const OutlinedWithIcons: Story = {
  args: {
    icons: ['misc:data'],
  },
  render: render(
    'outlined-with-icons',
    `<hra-action-card-action>
      <a hraHyperlink href="https://google.com">
        Action 1
      </a>
    </hra-action-card-action>
    <hra-action-card-action alignment="right">
      <a hraHyperlink href="https://google.com">
        Action 2
      </a>
    </hra-action-card-action>`,
  ),
};

export const ResponsiveCardGroup: Story = {
  args: {
    icons: ['misc:data'],
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-grid-container minWidth="17rem" columnGap="1.5rem" rowGap="1.5rem">
      @for (i of [1,2,3,4,5,6,7,8,9]; track i) {
        <hra-action-card variant="outlined-with-icons" [tagline]="tagline" [subtagline]="subtagline" [image]="image" [icons]="icons">
          ${args.content}
          <hra-action-card-action>
            <a hraHyperlink href="https://google.com">
              Action 1
            </a>
          </hra-action-card-action>
          <hra-action-card-action alignment="right">
            <a hraHyperlink href="https://google.com">
              Action 2
            </a>
          </hra-action-card-action>
        </hra-action-card>
      }
    </hra-grid-container>
    `,
  }),
};
