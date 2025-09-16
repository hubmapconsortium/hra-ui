/**
 * Type definitions and configurations for HRApop data visualization
 */

/** Data type options for visualization */
export type DataType = 'anatomical' | 'extraction-site' | 'dataset';

/** Y-axis value types for charts */
export type YAxisValue = 'cellCount' | 'cellPercentage';

/** Sort value options for data organization */
export type SortValue = 'totalCellCount' | 'alphabetical';

/**
 * Configuration for X-axis options
 */
export interface XAxisOption {
  /** Unique identifier for the option */
  value: string;
  /** Display label for the option */
  label: string;
  /** Field name in the data structure */
  field:
    | 'anatomicalStructureId'
    | 'anatomicalStructureLabel'
    | 'extractionSiteId'
    | 'extractionSiteLabel'
    | 'datasetId';
}

/**
 * Configuration for Y-axis options
 */
export interface YAxisOption {
  /** Unique identifier for the option */
  value: YAxisValue;
  /** Display label for the option */
  label: string;
}

/**
 * Configuration for sort options
 */
export interface SortOption {
  /** Unique identifier for the option */
  value: SortValue;
  /** Display label for the option */
  label: string;
}

/**
 * Configuration object for each data type
 */
export interface DataTypeConfig {
  /** Unique key identifying the data type */
  key: DataType;
  /** Display label for the data type */
  label: string;
  /** Available X-axis options for this data type */
  xAxisOptions: XAxisOption[];
  /** Field used for grouping data */
  groupByField: string;
}

/**
 * Mapping of tool identifiers to proper display names
 */
export const TOOL_DISPLAY_NAMES: Record<string, string> = {
  azimuth: 'Azimuth',
  celltypist: 'CellTypist',
  popv: 'popV',
  sc_proteomics: 'Sc-proteomics',
};

/**
 * Gets the proper display name for a tool
 * @param tool - The tool identifier
 * @returns The formatted display name
 */
export function getToolDisplayName(tool: string): string {
  return TOOL_DISPLAY_NAMES[tool] || tool;
}

/**
 * Y-axis options available for all data types
 */
export const Y_AXIS_OPTIONS: YAxisOption[] = [
  { value: 'cellCount', label: 'Raw Count' },
  { value: 'cellPercentage', label: 'Percentage' },
];

/**
 * Sort options available for all data types
 */
export const SORT_OPTIONS: SortOption[] = [
  { value: 'totalCellCount', label: 'Total Cell Count' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

/**
 * Configuration objects for each supported data type
 */
export const DATA_TYPE_CONFIGS: Record<DataType, DataTypeConfig> = {
  anatomical: {
    key: 'anatomical',
    label: 'Anatomical Structures',
    xAxisOptions: [
      {
        value: 'anatomicalStructureLabel',
        label: 'Anatomical Structure Name',
        field: 'anatomicalStructureLabel',
      },
      {
        value: 'anatomicalStructureId',
        label: 'Anatomical Structure ID',
        field: 'anatomicalStructureId',
      },
    ],
    groupByField: 'anatomicalStructureId',
  },
  'extraction-site': {
    key: 'extraction-site',
    label: 'Extraction Sites',
    xAxisOptions: [
      {
        value: 'extractionSiteLabel',
        label: 'Extraction Site Name',
        field: 'extractionSiteLabel',
      },
      {
        value: 'extractionSiteId',
        label: 'Extraction Site ID',
        field: 'extractionSiteId',
      },
    ],
    groupByField: 'extractionSiteId',
  },
  dataset: {
    key: 'dataset',
    label: 'Datasets',
    xAxisOptions: [
      {
        value: 'datasetId',
        label: 'Dataset ID',
        field: 'datasetId',
      },
      // Note: No name field available in current data model
    ],
    groupByField: 'datasetId',
  },
};
