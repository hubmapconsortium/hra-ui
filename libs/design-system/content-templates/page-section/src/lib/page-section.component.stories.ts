import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ProductLogoComponent } from '@hra-ui/design-system/brand/product-logo';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageLabelComponent } from '@hra-ui/design-system/content-templates//page-label';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { PageSectionComponent } from './page-section.component';

const meta: Meta<PageSectionComponent> = {
  component: PageSectionComponent,
  title: 'Design System/Content Templates/PageSection',
  decorators: [
    moduleMetadata({
      imports: [
        PageSectionComponent,
        ButtonsModule,
        MatIconModule,
        ProductLogoComponent,
        SectionLinkComponent,
        PageLabelComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

export const PageLabelSection: Story = {
  render: (args) => ({
    props: args,
    template: `
    <hra-page-section>
      <header-content>
        <hra-page-label app="ftu" organ="blood" tagline="Page label"></hra-page-label>
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
    styles: ['.hra-app { margin: 0 2rem; }', 'ul { margin: 0;  margin-bottom: 1.5rem;}'],
  }),
};

export const BodySection: Story = {
  args: {
    tagline: 'Section label in sentence case',
    size: 2,
    showDivider: false,
  },
  render: (args) => ({
    props: args,
    template: `
    <hra-page-section>
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
    styles: ['.hra-app { margin: 0 2rem; }', 'ul { margin: 0;  margin-bottom: 1.5rem;}'],
  }),
};
