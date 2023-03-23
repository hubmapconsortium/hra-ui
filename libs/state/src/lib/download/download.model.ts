export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
}

export interface DownloadFormat {
  format: FileFormat;
  label: string;
}

export type DownloadModel = DownloadFormat[];
