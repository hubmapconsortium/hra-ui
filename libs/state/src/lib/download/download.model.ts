/**
 * File format
 */
export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
  SVG = 'svg',
}

/**
 * Download format
 */
export interface DownloadFormat {
  /**
   * file format
   */
  format: FileFormat;

  /**
   * label display in UI
   */
  label: string;
}

export type DownloadModel = DownloadFormat[];
