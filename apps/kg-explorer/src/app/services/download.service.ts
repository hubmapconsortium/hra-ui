import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DigitalObjectMetadata, DistributionsInfo } from '../digital-objects-metadata.schema';
import { MenuOptionsType } from '@hra-ui/design-system/table';

/** Maps mediaType to file type data */
export const FILE_TYPE_MAP: Record<string, FileTypeData> = {
  'image/svg+xml': {
    name: 'SVG',
    typeSuffix: '.svg',
  },
  'image/png': {
    name: 'PNG',
    typeSuffix: '.png',
  },
  'application/postscript': {
    name: 'Adobe Illustrator',
    typeSuffix: '.ai',
  },
  'text/yaml': {
    name: 'YAML',
    typeSuffix: '.yaml',
  },
  'model/gltf-binary': {
    name: 'GLB',
    typeSuffix: '.glb',
  },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
    name: 'XLSX',
    typeSuffix: '.xlsx',
  },
  'text/vnd.mermaid': {
    name: 'MMD',
    typeSuffix: '.mmd',
  },
  'application/vnd.chipnuts.karaoke-mmd': {
    //TODO: Remove when data is fixed
    name: 'MMD',
    typeSuffix: '.mmd',
  },
  'text/csv': {
    name: 'CSV - Crosswalk',
    description: 'A CSV file connecting digital objects to ontology terms in ASCT+B Tables.',
    typeSuffix: '.csv',
  },

  'application/json': {
    name: 'JSON',
    typeSuffix: '.json',
  },
  'text/turtle': {
    name: 'Turtle',
    description:
      'Terse RDF Triple Language (Turtle) format helps developers write SPARQL queries to HRA data by making its triple structure explicit and showing possible subjects, predicates, and objects.',
    typeSuffix: '.ttl',
  },
  'application/ld+json': {
    name: 'JSON-LD',
    description:
      'A lightweight Linked Data format, ideal for programming environments, such as REST Web services, and unstructured databases such as Apache CouchDB and MongoDB.',
    typeSuffix: '.jsonld',
  },
  'application/rdf+xml': {
    name: 'RDF/XML',
    typeSuffix: '.xml',
  },
  'application/n-triples': {
    name: 'N-Triple',
    typeSuffix: '.nq',
  },
  'application/n-quads': {
    name: 'N-Quads',
    typeSuffix: '.nt',
  },
};

/** Interface for file type info */
interface FileTypeData {
  /** File name */
  name: string;
  /** Suffix to append to end of download url */
  typeSuffix: string;
  /** Optional file type description */
  description?: string;
}

/**
 * Service for handling file downloads
 */
@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  /** Http request service */
  private readonly http = inject(HttpClient);

  /**
   * Gets distributions data from metadata JSON and returns resolved download data
   * @param metadata Metadata JSON
   * @returns Array of distributions download info for the metadata
   */
  getDownloadOptions(metadata: DigitalObjectMetadata): MenuOptionsType[] {
    const id = metadata.id;
    const files = metadata.distributions;
    const derivedFiles = metadata.was_derived_from.distributions;
    return this.resolveDownloadOptions(id, derivedFiles.concat(files));
  }

  /**
   * Resolves download options
   * @param id Object id
   * @param files Array of distributions from metadata
   * @returns Resolved download data
   */
  private resolveDownloadOptions(id: string, files: DistributionsInfo[]) {
    return files.map((file) => {
      const fileType = FILE_TYPE_MAP[file.mediaType];
      return {
        id: id + fileType.typeSuffix,
        name: fileType.name,
        description: fileType.description,
        icon: 'download',
        url: file.downloadUrl,
      };
    });
  }

  /**
   * Downloads file
   * @param url Download url
   * @param id File name to save as
   */
  saveFile(url: string, id: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = id;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
