import { VisualizationSpec } from 'vega-embed';

// utils/visualization.ts
export interface AnatomicalBarGraphSpecOptions {
  graphTitle: string;
  values: Record<string, any>[];
  xField:
    | 'anatomicalStructureId'
    | 'anatomicalStructureLabel'
    | 'extractionSiteId'
    | 'extractionSiteLabel'
    | 'datasetId';
  yField: 'cellCount' | 'cellPercentage';
  toolFilter: string[];
  sexFilter: 'Male' | 'Female' | 'Both';
  sortBy: 'totalCellCount' | 'alphabetical';
  order: 'ascending' | 'descending';
  widthStep?: number;
  height?: number;
  // Add parameter for consistent global cell type ordering
  globalTopCellTypes?: string[];
}

// Predefined color palette for top 14 cell types (ordered by priority)
const PREDEFINED_COLORS = [
  '#95CBCF', // 1st - teal
  '#E5A8B2', // 2nd - pink
  '#8498AD', // 3rd - blue-grey
  '#B0F7EA', // 4th - light teal
  '#898AB4', // 5th - purple-grey
  '#D6B607', // 6th - yellow
  '#59678E', // 7th - dark blue
  '#D6E8F8', // 8th - light blue
  '#C8DFBE', // 9th - light green
  '#FFE9CB', // 10th - light orange
  '#AEA7C1', // 11th - light purple
  '#ACB4D2', // 12th - light blue-grey
  '#FBC6D2', // 13th - light pink
  '#B8C5D6', // 14th - additional light blue-grey
];

const OTHERS_COLOR = '#9E9E9E'; // Grey for "Others" category

// Function to calculate global top cell types (to be called once in the main component)
export function calculateGlobalTopCellTypes(
  allValues: Record<string, any>[],
  yField: 'cellCount' | 'cellPercentage',
): string[] {
  // Calculate total counts for each cell type across ALL data
  const cellTypeTotals = new Map<string, number>();

  allValues.forEach((item) => {
    const cellType = item['cellLabel'];
    const count = Number(item[yField]) || 0;
    cellTypeTotals.set(cellType, (cellTypeTotals.get(cellType) || 0) + count);
  });

  // Sort cell types by total count (descending) - most to least
  const sortedCellTypes = Array.from(cellTypeTotals.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([cellType]) => cellType);

  return sortedCellTypes;
}

// Function to process data and assign colors using global top cell types
function processDataWithGlobalTopCellTypes(values: Record<string, any>[], globalTopCellTypes?: string[]) {
  // If no global top cell types provided, calculate locally (fallback)
  if (!globalTopCellTypes) {
    // Calculate local totals as fallback
    const cellTypeTotals = new Map<string, number>();
    values.forEach((item) => {
      const cellType = item['cellLabel'];
      const count = Number(item['cellCount']) || 0;
      cellTypeTotals.set(cellType, (cellTypeTotals.get(cellType) || 0) + count);
    });

    globalTopCellTypes = Array.from(cellTypeTotals.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([cellType]) => cellType);
  }

  // Get top 14 cell types from global list
  const topCellTypes = globalTopCellTypes.slice(0, PREDEFINED_COLORS.length);
  const otherCellTypes = globalTopCellTypes.slice(PREDEFINED_COLORS.length);

  // Create color mapping
  const colorMapping = new Map<string, string>();
  topCellTypes.forEach((cellType, index) => {
    colorMapping.set(cellType, PREDEFINED_COLORS[index]);
  });

  // Add Others color
  if (otherCellTypes.length > 0) {
    colorMapping.set('Others', OTHERS_COLOR);
  }

  // Transform data: group non-top cell types as "Others"
  const transformedData = values.map((item) => ({
    ...item,
    originalCellLabel: item['cellLabel'], // Keep original for tooltip
    cellLabel: topCellTypes.includes(item['cellLabel']) ? item['cellLabel'] : 'Others',
  }));

  // Create final color arrays for Vega-Lite
  const finalCellTypes = [...topCellTypes];
  if (otherCellTypes.length > 0) {
    finalCellTypes.push('Others');
  }

  const finalColors = finalCellTypes.map((cellType) => colorMapping.get(cellType) ?? 'gray');

  return {
    transformedData,
    cellTypes: finalCellTypes,
    colors: finalColors,
    otherCellTypesCount: otherCellTypes.length,
  };
}

export function getAnatomicalBarGraphSpec(opts: AnatomicalBarGraphSpecOptions): VisualizationSpec {
  const {
    graphTitle,
    values,
    xField,
    yField,
    sortBy,
    order,
    toolFilter,
    sexFilter,
    widthStep = 60,
    height = 400,
    globalTopCellTypes,
  } = opts;

  if (!values || values.length === 0) {
    return {
      $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
      title: `${graphTitle} - No Data`,
      mark: 'text',
      encoding: {
        text: { value: 'No data available' },
      },
    };
  }

  const filters: any[] = [];

  if (toolFilter && toolFilter.length > 0) {
    filters.push({ field: 'tool', oneOf: toolFilter });
  }

  if (sexFilter && sexFilter !== 'Both') {
    filters.push({ field: 'sex', equal: sexFilter });
  }

  // Dynamic axis title based on field
  const getAxisTitle = (field: string) => {
    switch (field) {
      case 'anatomicalStructureLabel':
        return 'Anatomical Structure';
      case 'anatomicalStructureId':
        return 'Structure ID';
      case 'extractionSiteId':
        return 'Extraction Site';
      case 'extractionSiteLabel':
        return 'Extraction Site';
      case 'datasetId':
        return 'Dataset';
      default:
        return field;
    }
  };

  // Configure sorting based on sortBy option
  const getSortConfig = (): any => {
    if (sortBy === 'alphabetical') {
      return {
        field: xField,
        order: 'ascending', // Always ascending for alphabetical (A-Z)
      };
    } else if (sortBy === 'totalCellCount') {
      // Default to totalCellCount (sum of yField)
      return {
        field: yField,
        op: 'sum',
        order: order, // Use the provided order (typically descending for counts)
      };
    }
  };

  // Process data with global top cell types for consistent coloring
  const { transformedData, cellTypes, colors, otherCellTypesCount } = processDataWithGlobalTopCellTypes(
    values,
    globalTopCellTypes,
  );

  // Create global color sorting order based on globalTopCellTypes
  const globalColorSortOrder = globalTopCellTypes
    ? [
        ...globalTopCellTypes.slice(0, PREDEFINED_COLORS.length),
        ...(globalTopCellTypes.length > PREDEFINED_COLORS.length ? ['Others'] : []),
      ]
    : cellTypes;

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title: {
      text: graphTitle,
      font: 'Metropolis',
      fontSize: 14,
      fontWeight: 500,
      anchor: 'start',
      offset: 20,
    },
    width: { step: widthStep },
    height,
    data: {
      values: transformedData,
    },
    transform: filters.length > 0 ? [{ filter: { and: filters } }] : [],
    mark: {
      type: 'bar',
      tooltip: true,
    },
    encoding: {
      x: {
        field: xField,
        type: 'nominal',
        sort: getSortConfig(),
        axis: {
          title: getAxisTitle(xField),
          labelAngle: -45,
          labelFont: 'Metropolis',
          labelFontSize: 14,
          labelFontWeight: 500,
          labelLimit: 100,
        },
      },
      y: {
        field: yField,
        type: 'quantitative',
        aggregate: 'sum',
        axis: {
          title: yField === 'cellCount' ? 'Cell Count' : 'Percentage (%)',
          grid: true,
          labelAngle: -45,
          labelFont: 'Metropolis',
          labelFontSize: 14,
          labelFontWeight: 500,
          labelLimit: 100,
        },
      },
      color: {
        field: 'cellLabel',
        type: 'nominal',
        legend: {
          title: `Cell Type${otherCellTypesCount > 0 ? ` (Others: ${otherCellTypesCount} types)` : ''}`,
          orient: 'right',
          symbolLimit: 20,
          clipHeight: 40,
          columns: 2,
        },
        scale: {
          domain: cellTypes,
          range: colors,
        },
        sort: globalColorSortOrder,
      },
      tooltip: [
        { field: xField, type: 'nominal', title: getAxisTitle(xField) },
        { field: 'originalCellLabel', type: 'nominal', title: 'Original Cell Type' },
        { field: 'cellLabel', type: 'nominal', title: 'Display Category' },
        {
          field: yField,
          type: 'quantitative',
          title: yField === 'cellCount' ? 'Cell Count' : 'Percentage',
          format: ',.2f',
        },
        { field: 'tool', type: 'nominal', title: 'Tool' },
        { field: 'sex', type: 'nominal', title: 'Sex' },
      ],
    },
  };

  return spec;
}
