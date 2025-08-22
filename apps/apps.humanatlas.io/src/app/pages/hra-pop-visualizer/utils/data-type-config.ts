export type DataType = 'anatomical' | 'extraction-site' | 'dataset';
export type YAxisValue = 'cellCount' | 'cellPercentage';
export type SortValue = 'totalCellCount' | 'alphabetical';

export interface XAxisOption {
  value: string;
  label: string;
  field:
    | 'anatomicalStructureId'
    | 'anatomicalStructureLabel'
    | 'extractionSiteId'
    | 'extractionSiteLabel'
    | 'datasetId';
}

export interface YAxisOption {
  value: YAxisValue;
  label: string;
}

export interface SortOption {
  value: SortValue;
  label: string;
}

export interface DataTypeConfig {
  key: DataType;
  label: string;
  xAxisOptions: XAxisOption[];
  groupByField: string;
}

// Tool name mapping for proper display
export const TOOL_DISPLAY_NAMES: Record<string, string> = {
  azimuth: 'Azimuth',
  celltypist: 'CellTypist',
  popv: 'popV',
  sc_proteomics: 'Sc-proteomics',
};

// Function to get the proper display name for a tool
export function getToolDisplayName(tool: string): string {
  return TOOL_DISPLAY_NAMES[tool] || tool;
}

// Y-axis options (same for all data types)
export const Y_AXIS_OPTIONS: YAxisOption[] = [
  { value: 'cellCount', label: 'Raw Count' },
  { value: 'cellPercentage', label: 'Percentage' },
];

// Sort options (same for all data types)
export const SORT_OPTIONS: SortOption[] = [
  { value: 'totalCellCount', label: 'Total Cell Count' },
  { value: 'alphabetical', label: 'Alphabetical' },
];

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
