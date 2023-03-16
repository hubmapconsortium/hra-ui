export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
}

export class DownloadFile {
  static readonly type = '[Download] Download File';

  constructor(public selectedFormat: string) {}
}
