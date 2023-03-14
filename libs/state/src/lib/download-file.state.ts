import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { DownloadFile, FileFormat } from './download-file.action';
import { svg2pdf } from 'svg2pdf.js';
import { jsPDF } from 'jspdf';

//TODO: For testing purpose only
const fileUrl = 'assets/compass.svg';

/**
 * Download state model
 */
export interface DownloadStateModel {
  file: File | null;
}

/**
 * Download State Model used to convert
 * file from SVG file content to different
 * format and download to user.
 */
@State<DownloadStateModel>({
  name: 'download',
  defaults: {
    file: null,
  },
})
export class DownloadState {
  private readonly http = inject(HttpClient);

  fileConversion(url: string, selectedFormat: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/svg' });
      switch (selectedFormat) {
        case FileFormat.PDF:
          this.convertFileToPdf(blob, 'test');
          break;
        case FileFormat.PNG:
          this.convertFileToPng(blob, 'test');
          break;
        case FileFormat.AI:
          this.convertFileToAi(blob, 'test');
          break;
        default:
          console.error('Unsupported file format.');
          break;
      }
    });
  }

  blobDownload(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }

  @Action(DownloadFile)
  async downloadFile(ctx: StateContext<DownloadStateModel>, action: DownloadFile) {
    // Fetch the SVG file from the URL

    this.fileConversion(fileUrl, action.selectedFormat);
  }

  // Converts the SVG file to PDF format
  async convertFileToPdf(svgBlob: Blob, fileName: string) {
    // Convert the SVG blob to a string
    const svgString = await svgBlob.text();

    const parser = new DOMParser();
    const svgElement = parser.parseFromString(svgString, 'image/svg+xml').documentElement;

    // Create a new jsPDF object
    const pdfDoc = new jsPDF();

    // Convert the SVG to a PDF using svg2pdf.js
    const pdfArray = await svg2pdf(svgElement, pdfDoc);

    // Add the PDF array to the document
    pdfDoc.addPage();
    pdfDoc.addImage(pdfArray, 'PDF', 0, 0, pdfDoc.internal.pageSize.getWidth(), pdfDoc.internal.pageSize.getHeight());

    // Generate the PDF output
    const pdfOutput = pdfDoc.output('arraybuffer');

    this.blobDownload(new Blob([pdfOutput], { type: 'application/pdf' }), fileName + '.pdf');
  }

  // Converts the SVG file to PNG format
  async convertFileToPng(svgBlob: Blob, fileName: string) {
    console.log('svg to png call');
    // Replace with your file conversion code
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.src = svgUrl;

    const pngBlob = new Promise<Blob>((resolve) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Failed to create 2D context');
        }
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            throw new Error('Failed to convert SVG to PNG');
          }
        }, 'image/png');
      };
    });

    const url = window.URL.createObjectURL(await pngBlob);
    const anchor = document.createElement('a');
    document.body.appendChild(anchor);
    anchor.download = fileName;
    anchor.href = url;
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }

  // Converts the SVG file to Adobe Illustrator format
  convertFileToAi(blob: Blob, fileName: string) {
    // Replace with your file conversion code
    this.blobDownload(new Blob([blob], { type: 'application/postscript' }), fileName + '.ai');
  }
}
