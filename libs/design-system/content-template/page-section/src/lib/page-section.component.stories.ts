import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { PageSectionComponent } from './page-section.component';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { MatIconModule } from '@angular/material/icon';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';

const meta: Meta<PageSectionComponent> = {
  component: PageSectionComponent,
  title: 'Design System/Content Template/PageSection',
  decorators: [
    moduleMetadata({
      imports: [PageSectionComponent, ButtonsModule, MatIconModule, ProductLogoComponent],
    }),
  ],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2568-226',
    },
  },
};

export default meta;
type Story = StoryObj<PageSectionComponent>;

export const MainHeader: Story = {
  args: {
    tagline: 'Page label',
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-page-section tagline="${args.tagline}" [size]="1">
      <header-content>
        <div class="header-icons">
          <hra-product-logo name="ftu" size="large"></hra-product-logo>
          <div class="icon-background">
            <mat-icon class="header-icon" svgIcon="organ:blood"></mat-icon>
          </div>
        </div>
      </header-content>
      <section-content>
        This is placeholder text. We should try to keep this short. When writing content, imagine you've never been to the HRA before. What would you want to learn here?
        <ul>
          <li>Components may be swapped out for this button set</li>
          <li>Text always goes on top.</li>
          <li>Other components may be swapped out for the button set.</li>
        </ul>
        <button mat-button hraCtaButton >
          Action
          <mat-icon iconPositionEnd>arrow_forward</mat-icon>
        </button>
      </section-content>
    </hra-page-section>
    `,
    styles: [
      `.header-icons {
        display: flex;
        gap: .75rem;
      }`,
      `.icon-background {
        height: 4rem;
        width: 4rem;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--mat-sys-tertiary);
      }`,
      `.header-icon {
        --mat-icon-color: var(--mat-sys-on-primary);
        height: 60%;
        width: 60%;
      }`,
      `ul {
        margin: 0;
        margin-bottom: 1.5rem;
      }`,
    ],
  }),
};

export const BodySection: Story = {
  args: {
    tagline: 'Section label in sentence case',
    size: 2,
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-page-section tagline="${args.tagline}" size="${args.size}">
      <section-content>
        This is placeholder text. We should try to keep this short. When writing content, imagine you've never been to the HRA before. What would you want to learn here?
        <ul>
          <li>Components may be swapped out for this button set</li>
          <li>Other components may be swapped out for the button set.</li>
        </ul>
        <button mat-button hraCtaButton >
          Action
          <mat-icon iconPositionEnd>arrow_forward</mat-icon>
        </button>
      </section-content>
    </hra-page-section>
    `,
    styles: [
      `ul {
        margin: 0;
        margin-bottom: 1.5rem;
      }`,
    ],
  }),
};
