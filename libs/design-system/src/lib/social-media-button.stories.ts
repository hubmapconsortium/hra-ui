import { provideHttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { provideIcons } from '@hra-ui/cdk/icons';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

const SOCIAL_LINKS: Record<string, string> = {
  x: 'https://twitter.com/cnscenter',
  facebook: 'https://www.facebook.com/cnscenter/',
  instagram: 'https://www.instagram.com/cns_at_iu/',
  youtube: 'https://www.youtube.com/@CNSCenter/',
  linkedin: 'https://www.linkedin.com/company/cns-indiana-university-bloomington',
  email: 'mailto:infoccf@iu.edu',
};

const meta: Meta = {
  title: 'SocialMediaButton',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=333-4',
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideIcons({
          fontIcons: {
            defaultClasses: ['material-symbols-rounded'],
          },
        }),
      ],
    }),
    moduleMetadata({
      imports: [MatIconModule],
    }),
  ],
};
export default meta;
type Story = StoryObj;

export const SocialButton: Story = {
  args: {
    name: 'email',
    useSmall: true,
  },
  argTypes: {
    name: {
      control: 'select',
      options: ['email', 'facebook', 'instagram', 'linkedin', 'x', 'youtube'],
    },
    useSmall: {
      control: 'boolean',
    },
  },
  render: (args) => ({
    props: args,
    template: `<a href="${SOCIAL_LINKS[args['name']]}" target="_blank" rel="noopener noreferrer">
      <mat-icon
        [class.small]="${args['useSmall']}"
        svgIcon=social:${args['name'] + (args['useSmall'] ? '' : '_large')}
      ></mat-icon>
    </a>`,
    styles: [
      `mat-icon {
        border-radius: 100%;
        width: 3rem;
        height: 3rem;
        outline-color: transparent;

        &.small {
          width: 2.25rem;
          height: 2.25rem;
        }
      }`,
      `a {
        --mat-icon-color: var(--sys-tertiary);

        &:hover {
          mat-icon {
            color: rgb(from var(--mat-icon-color) r g b / 0.92);
          }
        }

        &:active {
          mat-icon {
            color: rgb(from var(--mat-icon-color) r g b / 0.84);
          }
        }

        &:focus-visible {
          --mat-icon-color: white;
          outline: none;

          mat-icon {
            border: 0.25rem solid var(--sys-tertiary);
            svg {
              position: relative;
              height: 3rem;
              width: 3rem;
              right: 0.25rem;
              bottom: 0.25rem;
            }
          }

          mat-icon.small {
            border: 0.125rem solid var(--sys-tertiary);
            svg {
              height: 2.25rem;
              width: 2.25rem;
              right: 0.125rem;
              bottom: 0.125rem;
            }
          }

          .fill-contrast {
            fill: var(--sys-secondary);
          }
        }
      }`,
    ],
  }),
};
