/** A list of ways to use a panel */
export interface AboutListContent {
  /** List heading */
  heading: string;
  /** List items */
  items: string[];
}

/** A section of the About sheet, one per panel */
export interface AboutSectionContent {
  /** Panel name */
  heading: string;
  /** What the panel shows */
  description: string;
  /** Ways to use the panel */
  lists?: AboutListContent[];
}

/** All text content for the About sheet */
export interface AboutContent {
  /** Sheet title */
  title: string;
  /** Text below the title */
  description: string;
  /** Close button label and tooltip */
  closeLabel: string;
  /** One section per panel */
  sections: AboutSectionContent[];
}

/** Text content for the About sheet, from the panels' former Info menus */
export const ABOUT_CONTENT: AboutContent = {
  title: 'About the visualization',
  description: 'What each panel shows and how to explore it.',
  closeLabel: 'Close about',
  sections: [
    {
      heading: 'Metadata',
      description: 'Metadata for this dataset.',
    },
    {
      heading: 'Cell types',
      description:
        'Show or hide cell types in the visualization and plots, and update the color of each cell type. ' +
        'Show or hide the cell link columns from Display in the toolbar.',
    },
    {
      heading: 'Distance visualization',
      description: 'Each cell and the link from it to its nearest anchor cell.',
      lists: [
        { heading: 'Zoom', items: ['Mouse pinwheel', 'Trackpad pinch'] },
        { heading: 'Pan', items: ['CTRL/CMD + mouse drag', 'Right click + mouse drag', 'Keyboard arrows'] },
        { heading: 'Rotate', items: ['CTRL/CMD + keyboard arrows', 'Mouse drag'] },
      ],
    },
    {
      heading: 'Violin graph',
      description:
        'This violin plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell ' +
        'type in the dataset.',
    },
    {
      heading: 'Histogram',
      description:
        'This histogram plot shows the cell-to-nearest-anchor cell distance distributions categorized by each cell ' +
        'type in the dataset.',
    },
  ],
};
