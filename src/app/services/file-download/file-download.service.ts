import { DOCUMENT, LOCATION_INITIALIZED } from "@angular/common";
import { ErrorHandler, Inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FileDownloadService {
    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
        private readonly errorHandler: ErrorHandler
    ) { }

    async download(url: string, filename = this.getFilename(url)): Promise<void> {
        let blobUrl: string | undefined;

        try {
            const response = await fetch(url, {
                headers: new Headers({
                    'Origin': location.origin
                }),
                mode: 'cors'
            });
            const data = await response.blob();
            blobUrl = URL.createObjectURL(data);
            this.createDownloadEl(blobUrl, filename);
        } catch (error) {
            this.errorHandler.handleError(error);
        } finally {
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        }
    }

    private getFilename(url: string): string {
        return url.split('\\').pop()?.split('/').pop() ?? '';
    }

    private createDownloadEl(blobUrl: string, filename: string): void {
        const el = this.document.createElement('a');
        el.href = blobUrl;
        el.download = filename;

        this.document.body.appendChild(el);
        el.click();
        el.remove();
    }
}
