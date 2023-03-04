export enum FileFormat {
  PDF = 'pdf',
  PNG = 'png',
  AI = 'ai',
}

export class DownloadFile {
  static readonly type = '[Download] Download File';

  constructor(public url: string, public fileName: string, public selectedFormat: string) {}

  // Converts the SVG file to PDF format
  convertFileToPdf(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/pdf' }));
  }

  // Converts the SVG file to PNG format
  convertFileToPng(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'image/png' }));
  }

  // Converts the SVG file to Adobe Illustrator format
  convertFileToAi(svgContent: string): Promise<Blob> {
    // Replace with your file conversion code
    return Promise.resolve(new Blob([svgContent], { type: 'application/postscript' }));
  }
}
