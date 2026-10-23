/** Identifiers for each downloadable file */
export type DownloadFileId = 'cells' | 'cell-links' | 'color-map' | 'visualization' | 'violin-graph' | 'histogram';

/** File formats offered by the downloads drawer */
export type DownloadFormat = 'csv' | 'png' | 'svg';

/** Request to download a single file in a single format */
export interface DownloadRequest {
  /** File to download */
  file: DownloadFileId;
  /** Format to download the file in */
  format: DownloadFormat;
}

/** A format option for a downloadable file */
export interface DownloadFormatContent {
  /** Format identifier */
  id: DownloadFormat;
  /** Visible button label */
  label: string;
  /** Accessible button name. Must include the visible label */
  ariaLabel: string;
}

/** A downloadable file */
export interface DownloadFileContent {
  /** File identifier */
  id: DownloadFileId;
  /** File name */
  name: string;
  /** Short description of the file contents */
  description: string;
  /** Available formats */
  formats: DownloadFormatContent[];
}

/** A link shown after a note */
export interface DownloadLinkContent {
  /** Link text */
  label: string;
  /** Link url */
  url: string;
}

/** A note shown below a group heading */
export interface DownloadNoteContent {
  /** Note text */
  text: string;
  /** Optional link shown after the text */
  link?: DownloadLinkContent;
}

/** A group of downloadable files */
export interface DownloadGroupContent {
  /** Group heading */
  heading: string;
  /** Optional notes shown below the heading */
  notes?: DownloadNoteContent[];
  /** Files in the group */
  files: DownloadFileContent[];
}

/** All text content for the downloads button and drawer */
export interface DownloadsContent {
  /** Drawer title. Also used as the downloads button label and tooltip */
  title: string;
  /** Close button label and tooltip */
  closeLabel: string;
  /** File groups */
  groups: DownloadGroupContent[];
}

/** Text content for the downloads button and drawer */
export const DOWNLOADS_CONTENT: DownloadsContent = {
  title: 'Downloads',
  closeLabel: 'Close downloads',
  groups: [
    {
      heading: 'Data',
      notes: [
        { text: 'CSV files include only the cell types currently shown and leave out deleted cells.' },
        {
          text: 'The embeddable visualization needs the Cells CSV. Cell links and Cell color map are optional and are generated when missing.',
          link: {
            label: 'Embedding guide',
            url: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md',
          },
        },
      ],
      files: [
        {
          id: 'cells',
          name: 'Cells',
          description: 'Nodes: one row per cell, with its cell type and coordinates.',
          formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cells CSV' }],
        },
        {
          id: 'cell-links',
          name: 'Cell links',
          description: 'Edges: one row per link between a cell and its closest anchor cell, with the distance.',
          formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell links CSV' }],
        },
        {
          id: 'color-map',
          name: 'Cell color map',
          description: 'One row per cell type, with its color.',
          formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell color map CSV' }],
        },
      ],
    },
    {
      heading: 'Images',
      files: [
        {
          id: 'visualization',
          name: 'Distance visualization',
          description: 'An image of the current view.',
          formats: [{ id: 'png', label: 'PNG', ariaLabel: 'Download distance visualization PNG' }],
        },
        {
          id: 'violin-graph',
          name: 'Violin graph',
          description: 'Distance distribution for each cell type.',
          formats: [
            { id: 'png', label: 'PNG', ariaLabel: 'Download violin graph PNG' },
            { id: 'svg', label: 'SVG', ariaLabel: 'Download violin graph SVG' },
          ],
        },
        {
          id: 'histogram',
          name: 'Histogram',
          description: 'Cell counts by distance to the closest anchor cell.',
          formats: [
            { id: 'png', label: 'PNG', ariaLabel: 'Download histogram PNG' },
            { id: 'svg', label: 'SVG', ariaLabel: 'Download histogram SVG' },
          ],
        },
      ],
    },
  ],
};
