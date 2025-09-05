import { VisualizationSpec } from 'vega-embed';
import { YAxisValue, SortValue } from './data-type-config';

/**
 * Configuration options for generating bar graph specifications
 */
export interface AnatomicalBarGraphSpecOptions {
  /** Title displayed at the top of the graph */
  graphTitle: string;
  /** Array of data objects to visualize */
  values: Record<string, any>[];
  /** Field name to use for X-axis values */
  xField:
    | 'anatomicalStructureId'
    | 'anatomicalStructureLabel'
    | 'extractionSiteId'
    | 'extractionSiteLabel'
    | 'datasetId';
  /** Field name to use for Y-axis values */
  yField: YAxisValue;
  /** Array of tools to filter data by */
  toolFilter: string[];
  /** Sex filter option */
  sexFilter: 'Male' | 'Female' | 'Both';
  /** Method to sort the data */
  sortBy: SortValue;
  /** Sort order direction */
  order: 'ascending' | 'descending';
  /** Width step for each bar in pixels */
  widthStep?: number;
  /** Height of the chart in pixels */
  height?: number;
}

/**
 * Formats tool names for better display in charts
 * @param tool - The tool identifier to format
 * @returns The formatted tool name
 */
function formatToolName(tool: string): string {
  const toolDisplayNames: Record<string, string> = {
    azimuth: 'Azimuth',
    celltypist: 'CellTypist',
    popv: 'popV',
    sc_proteomics: 'Sc-proteomics',
  };
  return toolDisplayNames[tool] || tool.charAt(0).toUpperCase() + tool.slice(1);
}

/**
 * Generates a Vega-Lite specification for bar graph visualization
 *
 * Creates a faceted bar chart with rows for annotation tools and columns for sex,
 * with independent scales per tool for optimal data visualization.
 *
 * @param opts - Configuration options for the bar graph
 * @returns A complete Vega-Lite visualization specification
 */
export function getBarGraphSpec(opts: AnatomicalBarGraphSpecOptions): VisualizationSpec {
  const { graphTitle, values, xField, yField, sortBy, order, toolFilter, widthStep = 50, height = 300 } = opts;

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

  // Format tool names for better display
  const transformedValues = values.map((item) => ({
    ...item,
    toolFormatted: formatToolName(item['tool']),
  }));

  const filters: any[] = [];
  if (toolFilter && toolFilter.length > 0) {
    filters.push({ field: 'tool', oneOf: toolFilter });
  }

  /**
   * Gets the appropriate axis title for a given field
   * @param field - The field name
   * @returns The formatted axis title
   */
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

  /**
   * Gets the sort configuration based on sort options
   * @returns Vega-Lite sort configuration object
   */
  const getSortConfig = (): any => {
    if (sortBy === 'alphabetical') {
      return { field: xField, order: 'ascending' };
    }
    return { field: yField, op: 'sum', order: order };
  };

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    title: {
      text: graphTitle,
      font: 'Metropolis',
      fontSize: 16,
      fontWeight: 600,
      anchor: 'start',
      offset: 20,
    },
    data: { values: transformedValues },
    transform: filters.length > 0 ? [{ filter: { and: filters } }] : [],
    padding: { top: 100, bottom: 100, left: 50, right: 50 },

    align: 'each',
    // ROWS = Annotation Tools, COLUMNS = Sex
    facet: {
      row: {
        field: 'toolFormatted',
        type: 'nominal',
        header: {
          title: 'Annotation Tool',
          titleFont: 'Metropolis',
          titleFontSize: 14,
          titleFontWeight: 600,
          labelFont: 'Metropolis',
          labelFontSize: 13,
          labelFontWeight: 600,
          labelPadding: 10,
        },
      },
      column: {
        field: 'sex',
        type: 'nominal',
        header: {
          title: 'Sex',
          titleFont: 'Metropolis',
          titleFontSize: 14,
          titleFontWeight: 600,
          labelFont: 'Metropolis',
          labelFontSize: 13,
          labelFontWeight: 600,
          labelPadding: 10,
        },
      },
    },
    spacing: { row: 50, column: 100 },
    resolve: {
      scale: {
        y: 'independent', // Each tool (row) gets its own Y scale
        color: 'shared', // Colors stay consistent across all charts
        x: 'independent', // Each column can have its own X scale if needed
      },
    },

    //spec for each individual facet
    spec: {
      width: { step: widthStep },
      height,
      mark: { type: 'bar', tooltip: true },
      encoding: {
        x: {
          field: xField,
          type: 'nominal',
          sort: getSortConfig(),
          axis: {
            title: getAxisTitle(xField),
            labelAngle: -45,
            labelFont: 'Metropolis',
            labelFontSize: 10,
            labelFontWeight: 400,
            labelLimit: 100,
            labelPadding: 8,
            titlePadding: 20,
          },
        },

        y: {
          field: yField,
          type: 'quantitative',
          aggregate: 'sum',
          axis: {
            title: yField === 'cellCount' ? 'Cell Count' : 'Percentage (%)',
            titleFont: 'Metropolis',
            titleFontSize: 11,
            titleFontWeight: 500,
            grid: true,
            labelFont: 'Metropolis',
            labelFontSize: 10,
            labelFontWeight: 400,
            tickCount: 6,
            labelPadding: 8,
            titlePadding: 20,
          },
        },
        color: {
          field: 'cellLabel',
          type: 'nominal',
          legend: {
            title: 'Cell Type',
            titleFont: 'Metropolis',
            titleFontSize: 12,
            titleFontWeight: 600,
            labelFont: 'Metropolis',
            labelFontSize: 11,
            labelLimit: 120,
            rowPadding: 32,
            columnPadding: 32,
            symbolSize: 110,
            orient: 'right',
            columns: 2,
            symbolLimit: 20,
          },
          scale: {
            scheme: 'set3',
          },
        },

        tooltip: [
          { field: xField, type: 'nominal', title: getAxisTitle(xField) },
          { field: 'cellLabel', type: 'nominal', title: 'Cell Type' },
          {
            field: yField,
            type: 'quantitative',
            title: yField === 'cellCount' ? 'Cell Count' : 'Percentage (%)',
            format: ',.2f',
          },
          { field: 'toolFormatted', type: 'nominal', title: 'Annotation Tool' },
          { field: 'sex', type: 'nominal', title: 'Sex' },
        ],
      },
    },
  };

  return spec;
}
