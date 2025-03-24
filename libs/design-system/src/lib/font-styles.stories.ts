import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

interface FontStyles {
  type: string;
  description: string;
  typography: Record<string, string>;
}

const fontContent: Record<string, FontStyles> = {
  Display: {
    type: 'display',
    description: 'Splash text headings',
    typography: {
      large: 'Metropolis, Medium, 42/63, -1.25px',
      medium: 'Metropolis, Medium, 38/57, -1.75px',
      small: 'Metropolis, Medium, 32/48, -1.25px',
    },
  },
  Headline: {
    type: 'headline',
    description: 'Secondary headings',
    typography: {
      large: 'Metropolis, Medium, 32/48, 0px',
      medium: 'Metropolis, Medium, 28/42, 0px',
      small: 'Metropolis, Medium, 24/32, 0px',
    },
  },
  Title: {
    type: 'title',
    description: 'Tertiary headings, titles in app components',
    typography: {
      large: 'Metropolis, Medium, 22/33, 0px',
      medium: 'Metropolis, Medium, 20/30, 0px',
      small: 'Metropolis Medium, 16/24, 0px ',
    },
  },
  Label: {
    type: 'label',
    description: 'Buttons, application interfaces, data visualizations',
    typography: {
      large: 'Metropolis, Medium, 16/24, 0px',
      medium: 'Metropolis, Medium, 14/21, 0px ',
      small: 'Metropolis, Medium, 12/18, 0px',
      micro: 'Metropolis, Medium, 10/16, 0px',
    },
  },
  Body: {
    type: 'body',
    description: 'Paragraph text',
    typography: {
      xl: 'Nunito Sans, 18/27, +0.5px',
      large: 'Nunito Sans, 16/24, +0.5px',
      medium: 'Nunito Sans, 14/21, +0.5px',
      small: 'Nunito Sans, 12/18, +0.5px',
    },
  },
  Wordmark: {
    type: 'wordmark',
    description: 'HRA Wordmark only',
    typography: {
      large: 'Metropolis, Regular, 25/36, 0.1px',
      small: 'Metropolis, Regular, 12/18, 0px',
    },
  },
};

@Component({
  selector: 'hra-font-styles-demo',
  standalone: true,
  template: `
    <div class="card">
      <div class="header">
        <span class="header-title">{{ variant().type | titlecase }}</span>
        <span class="header-description">Uses: {{ variant().description }}</span>
      </div>
      @for (entry of typographies(); track entry) {
        <div [style]="getStyles(entry[0])">{{ entry[0] === 'xl' ? 'XL' : (entry[0] | titlecase) }}: {{ entry[1] }}</div>
      }
    </div>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      width: fit-content;
      box-shadow: 0rem 0.3125rem 1rem 0rem rgb(from var(--mat-sys-shadow) r g b / 0.322);
      border-radius: 1rem;
      padding: 1.5rem;
      gap: 1.5rem;
      color: var(--mat-sys-secondary);
    }

    .header {
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid var(--mat-sys-outline-variant);
      padding: 0 1.5rem 1rem 0;
      gap: 0.5rem;
      color: var(--mat-sys-on-secondary-fixed);

      .header-title {
        font: var(--mat-sys-headline-large);
        letter-spacing: var(--mat-sys-headline-large-tracking);
      }
      .header-description {
        font: var(--mat-sys-title-medium);
        letter-spacing: var(--mat-sys-title-medium-tracking);
      }
    }
  `,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class FontStylesDemoComponent {
  readonly variant = input.required<FontStyles>();
  readonly typographies = computed(() => Object.entries(this.variant().typography));

  getStyles(size: string) {
    return {
      font: `var(--mat-sys-${this.variant().type}-${size})`,
      'letter-spacing': `var(--mat-sys-${this.variant().type}-${size}-tracking)`,
    };
  }
}

import { CommonModule } from '@angular/common';
import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<FontStylesDemoComponent> = {
  component: FontStylesDemoComponent,
  title: 'FontStyles',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/Design-System-Components?node-id=192-39',
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(fontContent),
      mapping: fontContent,
    },
  },
  args: {
    variant: fontContent['Display'],
  },
};
export default meta;
type Story = StoryObj<FontStylesDemoComponent>;

export const Primary: Story = {
  args: {},
};
