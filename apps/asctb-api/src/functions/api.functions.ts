import {
  ASCT_HEADER_FIRST_COLUMN,
  DELIMETER,
  LEGACY_OMAP_HEADER_FIRST_COLUMN,
  OMAP_HEADER_FIRST_COLUMN,
  Row,
  TITLE_ROW_INDEX,
  arrayNameMap,
  arrayNameType,
  createObject,
  metadataArrayFields,
  metadataNameMap,
  objectFieldMap,
} from '../models/api.model';
import { WarningCode } from '../utils/warnings';
import { fixOntologyId } from './lookup.functions';
import { OmapDataTransformer } from './omap.functions';

/** Asctb data */
export interface ASCTBData {
  /** Data rows */
  data: Row[];
  /** Additional metadata */
  metadata: Record<string, string | string[]>;
  /** Warnings */
  warnings: string[];
  /** Whether the data is omap data */
  isOmap?: boolean;
}

/**
 * Normalizes the url to a google sheet
 *
 * @param url Sheets url
 * @returns A normalized url
 */
export function normalizeCsvUrl(url: string): string {
  if (url.startsWith('https://docs.google.com/spreadsheets/d/') && url.indexOf('export?format=csv') === -1) {
    const splitUrl = url.split('/');
    if (splitUrl.length === 7) {
      const sheetId = splitUrl[5];
      const gid = splitUrl[6].split('=')[1];
      return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    }
  }
  return url;
}

/**
 * Set a value in a data row
 *
 * @param column Column names
 * @param _columnNumber Column index
 * @param row Row data
 * @param value Value
 * @param warnings Set to add warnings to
 */
function setData(column: string[], _columnNumber: number, row: Row, value: string, warnings: Set<string>): void {
  if (column.length > 1) {
    const arrayName: arrayNameType = arrayNameMap[column[0]];
    const originalArrayName = column[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const objectArray: any[] = row[arrayName] || [];

    if (!arrayName) {
      warnings.add(`WARNING: unmapped array found ${originalArrayName} (Code ${WarningCode.UnmappedData})`);
    }

    if (column.length === 2) {
      if (objectArray.length === 0 && arrayName) {
        row[arrayName] = objectArray;
      }
      objectArray.push(createObject(value, originalArrayName));
    } else if (column.length === 3 && arrayName) {
      let arrayIndex = parseInt(column[1], 10) - 1;
      const fieldName = objectFieldMap[column[2]]; // || (column[2]?.toLowerCase() ?? '').trim();

      if (arrayIndex >= 0 && fieldName) {
        if (arrayIndex >= objectArray.length) {
          warnings.add(`WARNING: blank cells likely found in column: ${column.join('/')}, row: ${row.rowNumber}`);
        }
        // FIXME: Temporarily deal with blank columns since so many tables are non-conformant
        arrayIndex = objectArray.length - 1;
        if (arrayIndex < objectArray.length) {
          if (fieldName === 'id') {
            value = fixOntologyId(value);
          }
          if (objectArray[arrayIndex]) {
            objectArray[arrayIndex][fieldName] = value;
          } else {
            warnings.add(`WARNING: bad column: ${column.join('/')} (Code ${WarningCode.BadColumn})`);
          }
        }
      }
    }
  }
}

/** Regex matching invalid characters */
const invalidCharacterRegex = /_/gi;
/** Regex matching urls */
const isLinkRegex = /^http/gi;
/** Code point for 'A' */
const codepointUppercaseA = 65;
/** Length of the alhpabet */
const alphabetLength = 26;

/**
 * Get the column name for a column index.
 * Column names: A B C ... Z AA AB AC ... AZ ... ZA ... ZZ
 *
 * @param index Column index
 * @returns Column name
 */
function columnIndexToName(index: number): string {
  index = index + 1;
  const name = [];
  while (index) {
    const mod = (index - 1) % alphabetLength;
    index = Math.floor(Number((index - mod) / alphabetLength));
    name.unshift(String.fromCharCode(codepointUppercaseA + Number(mod)));
  }
  return name.join('');
}

/**
 * Checks that a cell's value is valid
 *
 * @param value Value to check
 * @param rowIndex Row index of value
 * @param columnIndex Column index of value
 * @param warnings Set to add warning to
 */
function validateDataCell(value: string, rowIndex: number, columnIndex: number, warnings: Set<string>): void {
  if (!isLinkRegex.test(value) && invalidCharacterRegex.test(value)) {
    const colName = columnIndexToName(columnIndex);
    warnings.add(
      `WARNING: Invalid characters in data cell at column: ${colName} row: ${
        rowIndex + 1
      } where data cell: ${value} (Code ${WarningCode.InvalidCharacter})`,
    );
  }
}

/**
 * buildMetadata - build metadata key value store
 * @param metadataRows = rows from metadata to be extracted
 * @param warnings = warnings generated during the process are pushed to this set
 * @returns = returns key value pairs of metadata
 */
export const buildMetadata = (metadataRows: string[][], warnings: Set<string>): Record<string, string | string[]> => {
  const [titleRow] = metadataRows.splice(TITLE_ROW_INDEX, 1);
  const [title] = titleRow.slice(0, 1);

  const result: Record<string, string | string[]> = {
    title,
  };

  return metadataRows.reduce((metadata: Record<string, string | string[]>, rowData: string[], rowNumber: number) => {
    const [metadataIdentifier, metadataValue, ..._] = rowData;
    /**
     * Raise Warnings:
     *    Case 1: IF the Metadata Key/Value is filled or empty
     *    Case 2: IF the metadata key is not mapping with metadataNameMap
     */
    if (!metadataIdentifier) {
      warnings.add(
        `WARNING: Metadata Key missing found at Row: ${rowNumber + 3} (Code ${WarningCode.UnmappedMetadata})`,
      );
      return metadata;
    } else if (!metadataValue) {
      warnings.add(
        `WARNING: Metadata Value missing found at Row: ${rowNumber + 3} (Code ${WarningCode.UnmappedMetadata})`,
      );
    }
    let metadataKey = metadataNameMap[metadataIdentifier];
    if (!metadataKey) {
      metadataKey = metadataIdentifier.toLowerCase();
      warnings.add(
        `WARNING: unmapped metadata found ${metadataIdentifier} at Row: ${rowNumber + 3} (Code ${
          WarningCode.UnmappedMetadata
        })`,
      );
    }
    if (metadataArrayFields.includes(metadataKey)) {
      metadata[metadataKey] = metadataValue.split(DELIMETER).map((item) => item.trim());
    } else {
      metadata[metadataKey] = metadataValue.trim();
    }
    return metadata;
  }, result);
};

/**
 * Finds the header row
 *
 * @param headerRow Start index
 * @param data Data rows
 * @param firstColumnName First column
 * @returns Index of the header row
 */
export function findHeaderIndex(headerRow: number, data: string[][], firstColumnName: string): number {
  for (let i = headerRow; i < data.length; i++) {
    if (data[i][0] === firstColumnName) {
      return i;
    }
  }
  return headerRow;
}

/**
 * Validates the header row
 *
 * @param headerData Data rows
 * @param rowIndex Header index
 * @param warnings Set to add warnings to
 */
function validateHeaderRow(headerData: string[][], rowIndex: number, warnings: Set<string>) {
  let columnIndex = 0;
  headerData.forEach((value) => {
    /**
     * Validate the Header of length 3: i.e after splitting header with ("/")
     */
    if (value.length === 3) {
      const colName = columnIndexToName(columnIndex);
      const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join(
        '/',
      )} (Code ${WarningCode.InvalidHeader})`;
      const columnBlank = value.join('').trim().length === 0;
      const col0Warnings = value[0].trim().length === 0 || !arrayNameMap[value[0].toUpperCase()];
      const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
      const col2Warnings = value[2].trim().length === 0 || !objectFieldMap[value[2]];
      const showWarnings = col0Warnings || col1Warnings || col2Warnings;

      if (columnBlank) {
        warnings.add(
          `WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${WarningCode.MissingHeader})`,
        );
      } else if (showWarnings) {
        warnings.add(invalidHeader);
      }
    }

    /**
     * Validate the Header of length 2: i.e after splitting header with ("/")
     */
    if (value.length === 2) {
      const colName = columnIndexToName(columnIndex);
      const invalidHeader = `WARNING: Invalid Header found at column: ${colName}, row: ${rowIndex} where Header Value: ${value.join(
        '/',
      )} (Code ${WarningCode.InvalidHeader})`;
      const columnBlank = value.join('').trim().length === 0;
      const col0Warnings = value[0].trim().length === 0 || !arrayNameMap[value[0].toUpperCase()];
      const col1Warnings = value[1].trim().length === 0 || Number.isNaN(parseInt(value[1]));
      const showWarnings = col0Warnings || col1Warnings;

      if (columnBlank) {
        warnings.add(
          `WARNING: Blank Header found at column: ${colName}, row: ${rowIndex} (Code ${WarningCode.MissingHeader})`,
        );
      } else if (showWarnings) {
        warnings.add(invalidHeader);
      }
    }
    columnIndex = columnIndex + 1;
  });
}

/**
 * Checks the data for missing ids
 *
 * @param column Column names
 * @param index Data index
 * @param row Row data
 * @param value Data value
 * @param rowData Raw row
 * @param warnings Set to add warnings to
 */
function checkMissingIds(
  column: string[],
  index: number,
  row: Row,
  value: string,
  rowData: string[],
  warnings: Set<string>,
) {
  /**
   * check for missing Uberon/CL IDs:
   */
  const lastElement = column[column.length - 1];
  const isId = lastElement.toLowerCase() === objectFieldMap['ID'];
  if (isId) {
    const nameValue = rowData[index - 2]?.trim() ?? '';
    const idValue = value.trim();
    const labelValue = rowData[index - 1]?.trim() ?? '';

    if (nameValue) {
      if (!idValue) {
        const colName = columnIndexToName(index);
        warnings.add(
          `WARNING: Missing Uberon/CL ID at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${
            WarningCode.MissingCTorAnatomy
          })`,
        );
      } else if (!labelValue) {
        const colName = columnIndexToName(index - 1);
        warnings.add(
          `WARNING: Missing RDFS Label for ID ${idValue} at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${
            WarningCode.MissingCTorAnatomy
          })`,
        );
      }
      if (column.join('/') === 'CT/1/ID' && (!idValue || !idValue.startsWith('CL:'))) {
        const colName = columnIndexToName(index);
        warnings.add(
          `WARNING: CT/1/ID is not a CL ID (required) at Column: ${colName}, Row: ${row.rowNumber + 1} (Code ${
            WarningCode.NoIdInCT1
          })`,
        );
      }
    }
  }
}

/** Get the header row */
export function getHeaderRow(
  data: string[][],
  omapHeader: string,
  asctbHeader: string,
  legacyOmapHeader: string,
): string[] | undefined {
  for (const item of data) {
    if (item[0] === omapHeader) {
      return item;
    }
    if (item[0] === asctbHeader) {
      return item;
    }
    if (item[0] === legacyOmapHeader) {
      return item;
    }
  }
  return undefined;
}

/**
 * Processes data into asctb format
 *
 * @param data Raw data
 * @returns Processed data
 */
export function makeASCTBData(data: string[][]): ASCTBData | undefined {
  const header =
    getHeaderRow(data, OMAP_HEADER_FIRST_COLUMN, ASCT_HEADER_FIRST_COLUMN, LEGACY_OMAP_HEADER_FIRST_COLUMN) ?? [];

  if (header[0] === LEGACY_OMAP_HEADER_FIRST_COLUMN) {
    const omapTransformer = new OmapDataTransformer(data, true);
    const omapWarnings = omapTransformer.warnings;
    const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
    return {
      ...asctbData,
      warnings: [...asctbData.warnings, ...omapWarnings],
      isOmap: true,
    };
  } else if (header[0] === OMAP_HEADER_FIRST_COLUMN) {
    const omapTransformer = new OmapDataTransformer(data, false);
    const omapWarnings = omapTransformer.warnings;
    const asctbData = makeASCTBDataWork(omapTransformer.transformedData);
    return {
      ...asctbData,
      warnings: [...asctbData.warnings, ...omapWarnings],
      isOmap: true,
    };
  } else if (header[0] === ASCT_HEADER_FIRST_COLUMN) {
    const asctbData = makeASCTBDataWork(data);
    return { ...asctbData, isOmap: false };
  } else {
    throw new Error(`Header row, first column should be : ${ASCT_HEADER_FIRST_COLUMN} or ${OMAP_HEADER_FIRST_COLUMN}`);
  }
}

/**
 * Processes data into asctb format
 *
 * @param data Raw data
 * @returns Processed data
 */
export function makeASCTBDataWork(data: string[][]): ASCTBData {
  const headerRow = findHeaderIndex(0, data, ASCT_HEADER_FIRST_COLUMN);
  const columns = data[headerRow].map((col: string) =>
    col
      .toUpperCase()
      .split('/')
      .map((s) => s.trim()),
  );
  const warnings: Set<string> = new Set<string>();

  validateHeaderRow(columns, headerRow + 2, warnings);

  const results = data.slice(headerRow + 1).map((rowData: string[], rowNumber) => {
    const row: Row = new Row(headerRow + rowNumber + 2);
    rowData.forEach((value, index) => {
      if (index < columns.length && columns[index].length > 1) {
        validateDataCell(value, row.rowNumber, index, warnings);
        setData(columns[index], index, row, value, warnings);
        checkMissingIds(columns[index], index, row, value, rowData, warnings);
      }
    });
    row.finalize();
    return row;
  });

  // build metadata key value store.
  const metadataRows = data.slice(0, headerRow);
  const metadata = buildMetadata(metadataRows, warnings);

  return {
    data: results,
    metadata: metadata,
    warnings: [...warnings],
  };
}
