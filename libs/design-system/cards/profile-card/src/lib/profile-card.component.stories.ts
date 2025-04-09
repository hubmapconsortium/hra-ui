import { type Meta, type StoryObj } from '@storybook/angular';

import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { TextHyperlinkDirective } from '@hra-ui/design-system/buttons/text-hyperlink';
import { IconButtonModule } from '@hra-ui/design-system/icon-button';
import { ProfileCardComponent } from './profile-card.component';

const meta: Meta<ProfileCardComponent> = {
  component: ProfileCardComponent,
  title: 'Design System/Cards/Profile',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=1720-14192',
    },
  },
  args: {
    alignment: 'left',
    pictureUrl: 'assets/ui-images/placeholder.png',
    name: 'Firstname Lastname',
    description: 'Occupation, Company',
  },
  argTypes: {
    alignment: {
      control: 'select',
      options: ['left', 'center'],
    },
  },
};
export default meta;
type Story = StoryObj<ProfileCardComponent>;

export const Default: Story = {
  name: 'Action Button',
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TextHyperlinkDirective, MatIconModule],
    },
    styles: [
      `.action-link {
        display: inline-flex;
        gap: 0.5rem;
        align-items: center;
      }
    }`,
    ],
    template: `
      <hra-profile-card
        [alignment]="alignment"
        [pictureUrl]="pictureUrl"
        [name]="name"
        [description]="description"
        [actionUrl]="actionUrl"
      >
        <a hraHyperlink [href]="actionUrl" target="_blank" rel="noopener noreferrer" class="action-link">
          Action <mat-icon>arrow_right_alt</mat-icon>
        </a>
      </hra-profile-card>
    `,
  }),
};

export const SocialIcons: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [TextHyperlinkDirective, MatIconModule, ButtonsModule, IconButtonModule],
    },
    styles: [
      `.social-media-actions {
        display: flex;
        gap: 0.5rem;
        align-items: center;

        @include utils.use-font(label, large);
        color: var(--mat-sys-on-tertiary-fixed);
      }

      .social-media-actions.centered {
        justify-content: center;
      }
    }`,
    ],
    template: `
      <hra-profile-card
        [alignment]="alignment"
        [pictureUrl]="pictureUrl"
        [name]="name"
        [description]="description"
        [actionUrl]="actionUrl"
      >
        <div class="social-media-actions" [class.centered]="alignment === 'center'">
          <a mat-icon-button [hraIconButtonVariant]="'color'" [hraIconButtonSize]="'small'">
            <mat-icon color="accent">mail</mat-icon>
          </a>
          <a mat-icon-button [hraIconButtonVariant]="'color'" [hraIconButtonSize]="'small'">
            <mat-icon color="accent">person</mat-icon>
          </a>
          <a mat-icon-button [hraIconButtonVariant]="'color'" [hraIconButtonSize]="'small'">
            <mat-icon svgIcon="social:linkedin" color="accent"></mat-icon>
          </a>
          <a mat-icon-button [hraIconButtonVariant]="'color'" [hraIconButtonSize]="'small'">
            <mat-icon svgIcon="social:github" color="accent"></mat-icon>
          </a>
        </div>
      </hra-profile-card>
    `,
  }),
};
