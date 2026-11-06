import { PanelId } from '../../models/panels';
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

/** A menu item's label and the supporting text under it */
export interface ToolbarMenuItemContent {
  /** Menu item label, which names the item */
  label: string;
  /** Supporting text, which describes the item */
  description: string;
}

/** A panel in the Panels menu */
export interface ToolbarPanelOption {
  /** Panel id */
  id: PanelId;
  /** Menu item label */
  label: string;
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
  /** Panels menu, its panels and the item that shows them all */
  panels: ToolbarItemContent & { options: ToolbarPanelOption[]; showAll: string };
  /** Display menu and its options */
  display: ToolbarItemContent & {
    cellLinks: ToolbarMenuItemContent;
    cellLinkData: ToolbarMenuItemContent;
    allMetadata: ToolbarMenuItemContent;
  };
  /** Reset menu and its actions */
  reset: ToolbarItemContent & {
    view: ToolbarMenuItemContent;
    deletedCells: ToolbarMenuItemContent;
    colors: ToolbarMenuItemContent;
    everything: ToolbarMenuItemContent;
  };
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
  panels: {
    label: 'Panels',
    tooltip: 'Show or hide panels',
    options: [
      { id: 'metadata', label: 'Metadata' },
      { id: 'distance-visualization', label: 'Distance visualization' },
      { id: 'violin-graph', label: 'Violin graph' },
      { id: 'histogram', label: 'Histogram' },
    ],
    showAll: 'Show all panels',
  },
  display: {
    label: 'Display',
    tooltip: 'Show or hide cell links and metadata',
    cellLinks: { label: 'Cell links', description: 'Lines from each cell to its nearest anchor cell' },
    cellLinkData: { label: 'Cell link data', description: 'Link counts in the Cell types table' },
    allMetadata: { label: 'All metadata', description: 'Include fields with no value' },
  },
  reset: {
    label: 'Reset',
    tooltip: 'Restore the view, cells or colors',
    view: { label: 'Reset view', description: 'Zoom to fit and undo rotation' },
    deletedCells: { label: 'Restore deleted cells', description: 'Cells deleted in the distance visualization' },
    colors: { label: 'Reset colors', description: 'Use default colors for all cell types' },
    everything: {
      label: 'Reset everything',
      description: 'View, panels, cells, colors, selection and display options',
    },
  },
  downloads: {
    label: 'Downloads',
    tooltip: 'Download data and images',
  },
  embed: {
    label: 'Embed',
    tooltip: 'Open the embedding guide on GitHub',
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
    tooltip: 'What each panel shows',
  },
  help: {
    label: 'Help',
    tooltip: 'Open guides and source code',
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
