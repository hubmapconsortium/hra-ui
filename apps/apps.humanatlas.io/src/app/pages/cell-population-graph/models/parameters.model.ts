/**
 * Main configuration and model definitions for the Cell Population Graph application.
 */

/** Configuration JSON URL */
const MAIN_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/main.config.json';

/** Preview configuration JSON URL */
const PREVIEW_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/preview.config.json';

/** Graph attributes used in the application */
enum GraphAttribute {
  None = '',
  CellType = 'cell_type',
  Dataset = 'dataset_id',
  Count = 'count',
  Percentage = 'percentage',
  Order = 'order',
  Sex = 'sex',
  Ethnicity = 'race',
  Age = 'age',
  Category = 'cat',
  Exposure = 'exp',
  Location = 'location',
  Laterality = 'laterality',
  YPosition = 'y_pos',
  DonorId = 'donor_id',
  DatasetName = 'dataset_name',
  CellOntologyID = 'cell_type_ontology_id',
}

/** Order types for sorting */
enum OrderType {
  Ascending = 'ascending',
  Descending = 'descending',
}

/** Preview modes for the application */
const previewModes = ['bluelake-kidney'] as const;

/** Type for PreviewMode, derived from the previewModes constant */
type PreviewMode = (typeof previewModes)[number];

/** Checks if a mode is a valid PreviewMode */
function isOfTypePreviewMode(mode: string): mode is PreviewMode {
  return (previewModes as readonly string[]).includes(mode);
}

/** Configuration interface for the Cell Population Graph */
interface Configuration {
  /** Unique label for the configuration */
  label: string;
  /** Base path for the configuration */
  basePath: string;
  /** List of datasets included in the configuration */
  datasets: string[];
  /** Group types for the configuration */
  groupTypes: Partial<Record<GraphAttribute, string>>;
  /** Fixed bars */
  fixed?: number;
  /** Color palette for the configuration */
  colorPalette: string[];
  /** Default sort attribute */
  sortAttributes: GraphAttribute[];
  /** Default Y-axis field */
  defaultYAxisField?: GraphAttribute;
  /** Default X-axis field */
  defaultXAxisField?: GraphAttribute;
  /** Default groupBy for sorting */
  defaultGroupBy?: GraphAttribute;
}

/** Interface representing the state of graph selections in the application. */
export interface GraphSelectionState {
  /** Source of the dataset being visualized */
  datasetSource: string;
  /** Field used for sorting the data */
  sortBy: string;
  /** Order type for sorting the data */
  orderType: OrderType;
  /** Field used for grouping the data */
  groupBy: GraphAttribute;
  /** Field used for the Y-axis in the graph */
  yAxisField: GraphAttribute;
  /** Field used for the X-axis in the graph */
  xAxisField: GraphAttribute;
}

/** Returns the title for a given graph attribute */
function getAttributeTitle(attribute: GraphAttribute): string {
  switch (attribute) {
    case GraphAttribute.Dataset:
      return 'Dataset ID';
    case GraphAttribute.DatasetName:
      return 'Dataset Name';
    case GraphAttribute.CellType:
      return 'Cell Type';
    case GraphAttribute.Count:
      return 'Cell Count';
    case GraphAttribute.Percentage:
      return 'Cell Proportion';
    case GraphAttribute.Sex:
      return 'Sex';
    case GraphAttribute.Ethnicity:
      return 'Ethnicity';
    case GraphAttribute.Category:
      return 'Category';
    case GraphAttribute.Age:
      return 'Age';
    case GraphAttribute.Exposure:
      return 'Exposure';
    case GraphAttribute.Laterality:
      return 'Laterality';
    case GraphAttribute.Location:
      return 'Location';
    case GraphAttribute.YPosition:
      return 'Vertical Tissue Block Position';
    case GraphAttribute.DonorId:
      return 'Donor';
    default:
      return '';
  }
}

export {
  MAIN_CONFIG_JSON,
  PREVIEW_CONFIG_JSON,
  GraphAttribute,
  OrderType,
  Configuration,
  PreviewMode,
  getAttributeTitle,
  isOfTypePreviewMode,
};

/** Dataset option interface for the application */
export interface DatasetOption {
  /** Unique identifier for the dataset */
  key: string;
  /** Display label for the dataset */
  label: string;
}

/** GroupBy option interface for the application */
export interface GroupOption {
  /** Unique identifier for the group */
  key: GraphAttribute;
  /** Display label for the group */
  label: string;
}
