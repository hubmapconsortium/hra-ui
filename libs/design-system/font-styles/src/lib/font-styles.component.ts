import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Content for font info card */
type FontContent = {
  title: string;
  description: string;
  typography: {
    small: string;
    medium?: string;
    large: string;
    splash?: string;
    subheaderLarge?: string;
    subheaderSmall?: string;
  };
};

/** Possible font sizes */
type FontSize = 'small' | 'medium' | 'large' | 'splash';

/**
 * Font styles for HRA design system
 */
@Component({
  selector: 'hra-font-styles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './font-styles.component.html',
  styleUrl: './font-styles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.--hra-splash-font]': 'getCssFont("splash")',
    '[style.--hra-splash-spacing]': 'getCssSpacing("splash")',
    '[style.--hra-large-font]': 'getCssFont("large")',
    '[style.--hra-large-spacing]': 'getCssSpacing("large")',
    '[style.--hra-medium-font]': 'getCssFont("medium")',
    '[style.--hra-medium-spacing]': 'getCssSpacing("medium")',
    '[style.--hra-small-font]': 'getCssFont("small")',
    '[style.--hra-small-spacing]': 'getCssSpacing("small")',
  },
})
export class FontStylesComponent {
  /** Typography type to display */
  typographyType = input<string>('headline');

  /** All typography info */
  fonts: Record<string, FontContent> = {
    display: {
      title: 'Display',
      description: 'Uses: Splash text headings',
      typography: {
        large: 'Large: Metropolis, Medium, 42/63, -1.25px',
        medium: 'Medium: Metropolis, Medium, 38/57, -1.75px',
        small: 'Small: Metropolis, Medium, 32/48, -1.25px',
      },
    },
    headline: {
      title: 'Headline',
      description: 'Uses: Secondary headings',
      typography: {
        large: 'Large: Metropolis, Medium, 32/48, 0px',
        medium: 'Medium: Metropolis, Medium, 28/42, 0px',
        small: 'Small: Metropolis, Medium, 24/32, 0px',
      },
    },
    title: {
      title: 'Title',
      description: 'Uses: Tertiary headings, titles in app components',
      typography: {
        large: 'Large: Metropolis, Medium, 24/36, 0px',
        medium: 'Medium: Metropolis, Medium, 20/30, 0px',
        small: 'Small: Metropolis Medium, 16/24, 0px ',
      },
    },
    label: {
      title: 'Label',
      description: 'Uses: Buttons, application interfaces, data visualizations',
      typography: {
        large: 'Large: Metropolis, Medium, 16/24, 0px',
        medium: 'Medium: Metropolis, Medium, 14/21, 0px ',
        small: 'Small: Metropolis, Medium, 12/18, 0px',
      },
    },
    body: {
      title: 'Body',
      description: 'Uses: Paragraph text',
      typography: {
        splash: 'Splash: Nunito Sans, 18/27, +0.5px',
        large: 'Large: Nunito Sans, 18/27, +0.5px',
        medium: 'Medium: Nunito Sans, 14/21, +0.5px',
        small: 'Small: Nunito Sans, 12/18, +0.5px',
      },
    },
    wordmark: {
      title: 'Wordmark',
      description: 'Uses: HRA Wordmark only',
      typography: {
        subheaderLarge: 'Wordmark 25px',
        large: 'Metropolis, Regular, 25/36, 0.1px',
        subheaderSmall: 'Wordmark 12px',
        small: 'Metropolis, Regular, 12/18, 0px',
      },
    },
  };

  /**
   * Gets font for typography
   * @param size size of font
   * @returns font value
   */
  getCssFont(size: FontSize): string {
    return `var(--sys-${this.typographyType()}-${size})`;
  }

  /**
   * Gets letter spacing for typography
   * @param size size of font
   * @returns letter spacing for use in css
   */
  getCssSpacing(size: FontSize): string {
    return `var(--sys-${this.typographyType()}-${size}-tracking)`;
  }
}
