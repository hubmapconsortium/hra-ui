export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
  SVG = 'svg',
}

export interface DownloadFormat {
  format: FileFormat;
  label: string;
}

export type DownloadModel = DownloadFormat[];
