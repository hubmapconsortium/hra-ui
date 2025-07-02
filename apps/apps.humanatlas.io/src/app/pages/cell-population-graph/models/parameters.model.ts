const MAIN_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/main.config.json';

const PREVIEW_CONFIG_JSON =
  'https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/config/preview.config.json';

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

enum OrderType {
  Ascending = 'ascending',
  Descending = 'descending',
}

const previewModes = ['bluelake-kidney'] as const;
type PreviewMode = (typeof previewModes)[number];

function isOfTypePreviewMode(mode: string): mode is PreviewMode {
  return (previewModes as readonly string[]).includes(mode);
}

interface Configuration {
  label: string;
  basePath: string;
  datasets: string[];
  groupTypes: Partial<Record<GraphAttribute, string>>;
  fixed?: number;
  colorPalette: string[];
  sortAttributes: GraphAttribute[];
  defaultYAxisField?: GraphAttribute;
  defaultXAxisField?: GraphAttribute;
  defaultGroupBy?: GraphAttribute;
}

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

export interface DatasetOption {
  key: string;
  label: string;
}

export interface GroupOption {
  key: GraphAttribute;
  label: string;
}
