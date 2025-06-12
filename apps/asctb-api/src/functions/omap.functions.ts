import { LEGACY_OMAP_HEADER_FIRST_COLUMN, OMAP_HEADER_FIRST_COLUMN, OMAP_ORGAN } from '../models/api.model';
import { buildMetadata, findHeaderIndex } from './api.functions';

/** Omap data transformer */
export class OmapDataTransformer {
  /** Data */
  private readonly data: string[][];
  /** Header row index */
  private readonly headerRow: number;
  /** All warnings */
  private readonly _warnings: Set<string>;
  /** Additional metadata */
  private readonly metaData: Record<string, string | string[]>;
  /** Transformed data */
  private readonly _transformedData: string[][];
  /** Whether this contains legacy omap data */
  private readonly isLegacyOmap: boolean;
  /** List of columns */
  private columns: string[] = [];

  /**
   * Initializes the transformer
   *
   * @param data Data to transform
   * @param legacy Whether the data is in legacy format
   */
  constructor(data: string[][], legacy = false) {
    this.isLegacyOmap = legacy;
    this.data = data;
    this.headerRow = legacy
      ? findHeaderIndex(0, this.data, LEGACY_OMAP_HEADER_FIRST_COLUMN)
      : findHeaderIndex(0, this.data, OMAP_HEADER_FIRST_COLUMN);
    this.metaData = this.getMetaData();
    this._warnings = new Set<string>();
    this._transformedData = this.transformOmapData();
  }

  /**
   * Transforms the data
   *
   * @returns The transformed data
   */
  private transformOmapData(): string[][] {
    // Initializing with the MetaData
    const asctbConverted: string[][] = [];
    // Add metadata and new header row and the actual data
    asctbConverted.push(...this.data.slice(0, this.headerRow), this.createNewHeaderRow(), ...this.createData());
    return asctbConverted;
  }

  /**
   * Derives a new header row for the transformed data
   *
   * @returns The new header row
   */
  private createNewHeaderRow(): string[] {
    const maxProteins = this.data.slice(this.headerRow + 1).map((subArr) => subArr[0].split(',').length);
    const newHeaderRow = ['AS/1', 'AS/1/LABEL', 'AS/1/ID'];
    for (let i = 1; i <= Math.max(...maxProteins); i++) {
      newHeaderRow.push(`BP/${i}`);
      newHeaderRow.push(`BP/${i}/LABEL`);
      newHeaderRow.push(`BP/${i}/ID`);
      newHeaderRow.push(`BP/${i}/NOTES`);
    }
    return newHeaderRow;
  }

  /**
   * Transforms the data
   *
   * @returns The transformed data rows
   */
  private createData(): string[][] {
    const dataObject: Record<string, string>[] = this.createMapOfOldColumnsAndValues();
    // Decides whether to take organs from table or constants
    const organColumnsPresent = ['organ', 'organ_uberon'].every((column) => this.columns.includes(column));
    const organ = OMAP_ORGAN[this.metaData['data_doi'] as string] ?? OMAP_ORGAN['default'];
    if (!(this.isLegacyOmap || organColumnsPresent)) {
      this._warnings.add('WARNING: Organ Columns Missing. Adding default Organ Columns');
    }
    if (this.isLegacyOmap && !OMAP_ORGAN[this.metaData['data_doi'] as string]) {
      this._warnings.add('WARNING: DOI mapping not present; Adding default Organ Columns.');
    }

    const transformedData: string[][] = [];
    const title = this.metaData['title'];
    const alternateOrgan = 'missing organ label';
    const alternateOrganUberon = 'missing organ UBERON id';
    let organLabelMissingWarningAdded = false;
    let organUberonMissingWarningAdded = false;

    dataObject.forEach((data) => {
      const uniprots = data['uniprot_accession_number'].split(', ');
      const hgncIds = data['HGNC_ID'].split(', ');
      const targetNames = data['target_symbol']?.split(', ') ?? [];
      if (!(uniprots.length === hgncIds.length && hgncIds.length === targetNames.length)) {
        this.warnings.add(
          'WARNING: Number of entires in column uniprot_accession_number, HGNC_ID,' +
            `target_symbol are not equal in row ${data['rowNo']}. uniprot_accession_number: ${uniprots.length};` +
            `HGNC_ID: ${hgncIds.length}; target_symbol: ${targetNames.length}`,
        );
      }
      let notes = `Extra information in "${title}", Row ${data['rowNo']} \n`;
      notes += data['notes'];
      if (!this.isLegacyOmap && !data['organ']) {
        data['organ'] = alternateOrgan;
        if (!organLabelMissingWarningAdded) {
          this._warnings.add('WARNING: Organ Label Missing.');
          organLabelMissingWarningAdded = true;
        }
      }
      if (!this.isLegacyOmap && !data['organ_uberon']) {
        data['organ_uberon'] = alternateOrganUberon;
        if (!organUberonMissingWarningAdded) {
          this._warnings.add('WARNING: Organ Uberon ID Missing.');
          organUberonMissingWarningAdded = true;
        }
      }
      if (
        data['uniprot_accession_number'] !== '' &&
        data['HGNC_ID'] !== '' &&
        data['target_symbol'] !== '' &&
        data['target_symbol'] !== undefined
      ) {
        const newrow = this.isLegacyOmap
          ? [organ.name, organ.rdfs_label, organ.id]
          : [data['organ'], data['organ'], data['organ_uberon']];
        const maxBPs = Math.max(uniprots.length, hgncIds.length, targetNames.length);
        for (let i = 0; i < maxBPs; i++) {
          newrow.push(targetNames[i] ?? '', uniprots[i] ?? '', hgncIds[i] ?? '', notes ?? '');
        }
        transformedData.push(newrow);
      } else {
        transformedData.push(
          (this.isLegacyOmap
            ? [organ.name, organ.rdfs_label, organ.id]
            : [data['organ'], data['organ'], data['organ_uberon']]) as string[],
        );
      }
    });

    return transformedData;
  }

  /** Get the metadata */
  private getMetaData(): Record<string, string | string[]> {
    const warnings = new Set<string>();
    const metadataRows = this.data.slice(0, this.headerRow);
    return buildMetadata(metadataRows, warnings);
  }

  /** Create a map from non-transformed columns and values */
  private createMapOfOldColumnsAndValues(): Record<string, string>[] {
    let dataObject: Record<string, string>[] = [];
    this.columns = this.data[this.headerRow].map((col) => col);

    this.data.slice(this.headerRow + 1).forEach((subArr, index) => {
      const keyValuePairs = this.columns.reduce((acc: Record<string, string>, key, i) => {
        acc[key] = subArr[i];
        return acc;
      }, {});
      // 4 = Two blank rows + 1 for 0 indexing of headerrow + 1 for 0 indexing for subArr
      keyValuePairs['rowNo'] = (index + this.headerRow + 4).toString();
      dataObject.push(keyValuePairs);
    });
    dataObject = this.createNotes(dataObject);
    return dataObject;
  }

  /** Creates additional notes */
  private createNotes(dataObject: Record<string, string>[]): Record<string, string>[] {
    const excludedKeys = ['uniprot_accession_number', 'HGNC_ID', 'target_symbol', 'rowNo'];
    dataObject.forEach((obj) => {
      const entries = Object.entries(obj);
      const formattedEntries = entries
        .filter(([key, value]) => value !== undefined && value !== null && value !== '' && !excludedKeys.includes(key))
        .map(([key, value]) => `**${key}:** ${value}`);
      const result = `- ${formattedEntries.join('\n- ')}`;
      obj['notes'] = result;
    });
    return dataObject;
  }

  /** Get the transformed data */
  get transformedData(): string[][] {
    return this._transformedData;
  }

  /** Get all warnings */
  get warnings(): Set<string> {
    return this._warnings;
  }
}
