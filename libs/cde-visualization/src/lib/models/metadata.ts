import { computed, Signal } from '@angular/core';
import { JsonFileLoaderService } from '@hra-ui/common/fs';
import { DataInput, loadData } from '@hra-ui/node-dist-vis/models';
import { NextObserver } from 'rxjs';

/** Metadata input */
export type MetadataInput = DataInput<Metadata>;
/** Signals for metadata properties */
export type MetadataMixins = { [P in keyof Metadata]: Signal<Metadata[P] | undefined> };

/** Metadata */
export interface Metadata {
  /** Title of the visualization */
  title?: string;
  /** Name of the organ */
  organ?: string;
  /** Technology */
  technology?: string;
  /** Sex */
  sex?: string;
  /** Age */
  age?: number;
  /** Thickness */
  thickness?: number;
  /** Pixel size */
  pixelSize?: number;
  /** Creation timestamp (ms since 1/1/1970 UTC) */
  creationTimestamp?: number;
  /** Name of the source file */
  sourceFileName?: string;
  /** Name of the colormap file */
  colorMapFileName?: string;
  /** Extra metadata for example datasets */
  sampleExtra?: SampleMetadataExtra;
}

/** Extra sample metadata (used by example datasets) */
export interface SampleMetadataExtra {
  /** Sample type, generally '2D' or '3D' */
  type: string;
  /** Organ name */
  organ: string;
  /** Data file url*/
  sampleUrl: string;
  /** Source Data Sheet url */
  sourceDataUrl: string;
}

/**
 * Function to load metadata.
 * @param input - Signal representing the metadata input.
 * @param mixins - Object containing signals for each metadata property.
 * @param loading - Optional observer to track loading state.
 * @returns Signal representing the loaded metadata.
 */
export function loadMetadata(
  input: Signal<MetadataInput>,
  mixins: MetadataMixins,
  loading?: NextObserver<boolean>,
): Signal<Metadata> {
  const data = loadData(input, JsonFileLoaderService, {}, loading);
  return computed(() => {
    const result = data();
    const metadata = typeof result === 'object' && result !== null ? (result as Metadata) : {};
    for (const key in mixins) {
      const value = mixins[key as keyof Metadata]?.();
      if (value !== undefined && value !== null && !Number.isNaN(value)) {
        metadata[key as keyof Metadata] = value as never;
      }
    }

    return metadata;
  });
}
