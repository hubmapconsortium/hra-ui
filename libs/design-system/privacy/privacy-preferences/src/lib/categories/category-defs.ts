import { EventCategory } from '@hra-ui/common/analytics/events';

/**
 * Category def interface
 */
export interface CategoryDef {
  /** Event Category ID */
  id: EventCategory;
  /** Title of the category */
  title: string;
  /** Description of the category */
  description: string;
  /** Details about the category */
  details?: string;
  /** Provider of the category */
  provider?: string;
  /** Link to the provider's privacy policy */
  providerLink?: string;
  /** Whether the category is required */
  required?: boolean;
}

/**
 * Definitions for each category
 */
export const CATEGORY_DEFS: CategoryDef[] = [
  {
    id: EventCategory.Necessary,
    title: 'Necessary',
    description: `Necessary cookies and similar technologies make websites usable by enabling basic functions like page navigation.
      The website cannot function properly without this feature.`,
    provider: 'Human Reference Atlas',
    providerLink: 'https://humanatlas.io/privacy-policy',
    required: true,
  },
  {
    id: EventCategory.Preferences,
    title: 'Preferences',
    description: `Preference cookies remember your choices, like your preferred language or display settings.
      They help the site behave in a way that matches your preferences.`,
    details: 'We do not use cookies or technology of this type',
  },
  {
    id: EventCategory.Statistics,
    title: 'Statistics',
    description: `We use statistics cookies and similar technologies to collect aggregated,
      anonymous data that help us understand traffic patterns, popular pages, and overall performance.
      This information supports continuous improvements to our website.`,
    provider: 'Human Reference Atlas',
    providerLink: 'https://humanatlas.io/privacy-policy',
  },
  {
    id: EventCategory.Marketing,
    title: 'Marketing',
    description: `These cookies are used by third-party services, such as YouTube, to enable embedded video playback.
      If these cookies are disabled, embedded videos will not play on this site.`,
    provider: 'YouTube',
    providerLink: 'https://policies.google.com/privacy',
  },
];
