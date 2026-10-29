import { ThemePreference } from '../../services/theme-switch/theme-switch.service';

/** Sheets that toolbar items open in the drawer */
export type ToolbarSheet = 'downloads' | 'about';

/** Guide for embedding the visualization in a website */
export const EMBEDDING_GUIDE_URL =
  'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md';

/** A toolbar item's label and the tooltip that says what it does */
export interface ToolbarItemContent {
  /** Visible label */
  label: string;
  /** Tooltip */
  tooltip: string;
}

/** A link in the Help menu */
export interface ToolbarHelpLink {
  /** Analytics feature id */
  id: string;
  /** Menu item label */
  label: string;
  /** Link target, opened in a new tab */
  url: string;
}

/** A choice in the Theme menu */
export interface ToolbarThemeOption {
  /** Theme menu choice */
  id: ThemePreference;
  /** Menu item label */
  label: string;
  /** Icon the Theme item shows while this choice is on */
  icon: string;
}

/** All text content for the toolbar */
export interface ToolbarContent {
  /** Accessible name of the toolbar */
  label: string;
  /** Display menu and its options */
  display: ToolbarItemContent & { cellLinks: string; cellLinkData: string; allMetadata: string };
  /** Reset menu and its actions */
  reset: ToolbarItemContent & { view: string; deletedCells: string; colors: string };
  /** Downloads sheet */
  downloads: ToolbarItemContent;
  /** Embedding guide link */
  embed: ToolbarItemContent & { url: string };
  /** Theme menu and its choices */
  theme: ToolbarItemContent & { options: ToolbarThemeOption[] };
  /** About sheet */
  info: ToolbarItemContent;
  /** Help menu and its links */
  help: ToolbarItemContent & { links: ToolbarHelpLink[] };
}

/** Text content for the toolbar */
export const TOOLBAR_CONTENT: ToolbarContent = {
  label: 'Visualization actions',
  display: {
    label: 'Display',
    tooltip: 'Choose what the visualization and tables show',
    cellLinks: 'Cell links',
    cellLinkData: 'Cell link data',
    allMetadata: 'All metadata',
  },
  reset: {
    label: 'Reset',
    tooltip: 'Reset the view, deleted cells or colors',
    view: 'Reset view',
    deletedCells: 'Restore deleted cells',
    colors: 'Reset colors',
  },
  downloads: {
    label: 'Downloads',
    tooltip: 'Download data and images',
  },
  embed: {
    label: 'Embed',
    tooltip: 'Embed this visualization in a website',
    url: EMBEDDING_GUIDE_URL,
  },
  theme: {
    label: 'Theme',
    tooltip: 'Choose a light or dark theme',
    options: [
      { id: 'system', label: 'System settings', icon: 'brightness_4' },
      { id: 'light', label: 'Light theme', icon: 'light_mode' },
      { id: 'dark', label: 'Dark theme', icon: 'dark_mode' },
    ],
  },
  info: {
    label: 'Info',
    tooltip: 'About this visualization',
  },
  help: {
    label: 'Help',
    tooltip: 'Guides and documentation',
    links: [
      { id: 'user-guide', label: 'User guide', url: 'https://humanatlas.io/user-story/5' },
      {
        id: 'github',
        label: 'Code on GitHub',
        url: 'https://github.com/hubmapconsortium/hra-ui/tree/main/apps/cde-ui',
      },
      { id: 'embedding-guide', label: 'Embedding guide', url: EMBEDDING_GUIDE_URL },
    ],
  },
};
