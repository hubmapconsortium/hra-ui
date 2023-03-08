export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
}

export class DownloadFile {
  static readonly type = '[Download] Download File';

  constructor(public url: string, public fileName: string, public selectedFormat: string) {}
}
