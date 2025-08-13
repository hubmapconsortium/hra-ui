import { Injectable } from '@angular/core';
import { MenuOptionsType } from '@hra-ui/design-system/table';

import { DigitalObjectMetadata, DistributionsInfo } from '../digital-objects-metadata.schema';

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

  //TODO: Remove when data is fixed
  'application/vnd.chipnuts.karaoke-mmd': {
    name: 'MMD',
    typeSuffix: '.mmd',
  },

  // Doesn't apply to crosswalk CSVs
  'text/csv': {
    name: 'CSV',
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
      const isCrosswalkCsv = file.mediaType === 'text/csv' && file.id.includes('crosswalk');
      return {
        id: id + fileType.typeSuffix,
        name: isCrosswalkCsv ? 'CSV - Crosswalk' : fileType.name,
        description: isCrosswalkCsv
          ? 'A CSV file connecting digital objects to ontology terms in ASCT+B Tables.'
          : fileType.description,
        icon: 'download',
        url: file.downloadUrl,
      };
    });
  }
}
