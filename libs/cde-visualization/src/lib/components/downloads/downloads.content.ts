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

/** A link shown after a notice */
export interface DownloadLinkContent {
  /** Link text */
  label: string;
  /** Link url */
  url: string;
}

/** An info notice shown after a group's files */
export interface DownloadNoticeContent {
  /** Notice text */
  text: string;
  /** Optional link shown after the text */
  link?: DownloadLinkContent;
}

/** A group of downloadable files */
export interface DownloadGroupContent {
  /** Group heading */
  heading: string;
  /** Files in the group */
  files: DownloadFileContent[];
  /** Optional info notice shown after the files */
  notice?: DownloadNoticeContent;
}

/** Files that can't be downloaded because they would be empty, and why */
export interface UnavailableDownloads {
  /** Files to disable */
  files: DownloadFileId[];
  /** Notice explaining why the files are disabled */
  notice: string;
}

/** Notices for files that would be empty with the current cell type selection */
export interface UnavailableDownloadsContent {
  /** Shown when no cell types are selected, so every file would be empty */
  noCellTypes: string;
  /** Shown when only the anchor cell type is selected, so the charts would be empty */
  noDistances: (anchorCellType: string) => string;
}

/** All text content for the downloads button and drawer */
export interface DownloadsContent {
  /** Drawer title. Also used as the downloads button label and tooltip */
  title: string;
  /** Supporting text below the title. Also describes the drawer */
  description: string;
  /** Close button label and tooltip */
  closeLabel: string;
  /** Hidden label read before each notice */
  noticeLabel: string;
  /** File groups */
  groups: DownloadGroupContent[];
  /** Notices for files that would be empty */
  unavailable: UnavailableDownloadsContent;
}

/** Text content for the downloads button and drawer */
export const DOWNLOADS_CONTENT: DownloadsContent = {
  title: 'Downloads',
  description: "Files match what's shown: visible cell types only, without deleted cells.",
  closeLabel: 'Close downloads',
  noticeLabel: 'Info',
  groups: [
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
          description: 'Cell counts by distance to the nearest anchor cell.',
          formats: [
            { id: 'png', label: 'PNG', ariaLabel: 'Download histogram PNG' },
            { id: 'svg', label: 'SVG', ariaLabel: 'Download histogram SVG' },
          ],
        },
      ],
    },
    {
      heading: 'Data',
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
          description: 'Edges: one row per link from a cell to its nearest anchor cell, with the distance.',
          formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell links CSV' }],
        },
        {
          id: 'color-map',
          name: 'Cell color map',
          description: 'One row per cell type, with its color.',
          formats: [{ id: 'csv', label: 'CSV', ariaLabel: 'Download cell color map CSV' }],
        },
      ],
      notice: {
        text: 'Embedding the visualization? It needs the Cells CSV. Cell links and the cell color map are optional and are generated when missing.',
        link: {
          label: 'Embedding guide',
          url: 'https://github.com/hubmapconsortium/hra-ui/blob/main/apps/cde-visualization-wc/EMBEDDING.md',
        },
      },
    },
  ],
  unavailable: {
    noCellTypes: 'Select at least one cell type to download files.',
    noDistances: (anchorCellType) =>
      `Select a cell type other than ${anchorCellType} to download the violin graph and histogram.`,
  },
};
