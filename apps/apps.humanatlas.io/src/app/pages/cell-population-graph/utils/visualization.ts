import { LegendOrient } from 'vega';
import { VisualizationSpec } from 'vega-embed';
import { GraphAttribute, OrderType, GRAPH_ATTRIBUTE_LABELS } from '../models/parameters.model';

/**
 * Options for the stacked bars visualization specification.
 */
export interface StackedBarsSpecOptions {
  /** Values to be visualized in the stacked bars */
  values: Record<string, any>[];
  /** Field used for the x-axis */
  xAxisField: GraphAttribute;
  /** Field used for the y-axis */
  yAxisField: GraphAttribute;
  /** Field used for sorting data */
  sortBy: string;
  /** Order type for sorting (ascending or descending) */
  orderType: OrderType;
  /** Field used for grouping the data */
  groupBy: GraphAttribute;
  /** Field used for the legend */
  legendField: GraphAttribute;
  /** Domain for the legend, representing unique values for the legend field */
  legendDomain: string[];
  /** Range of colors for the legend */
  legendRange: string[];
  /** Number of fixed bars to display at the start */
  fixedBars?: number;
  /** Width of each bar in the graph */
  barWidth?: number;
  /** Height of the graph */
  graphHeight?: number;
  /** Whether to show tooltips on hover */
  tooltip?: boolean;
  /** Spacing between groups of bars */
  groupSpacing?: number;
  /** Angle for the x-axis labels */
  labelAngle?: number;
  /** Limit for the number of symbols in the legend */
  legendSymbolLimit?: number;
  /** Number of symbols per column in the legend */
  legendSymbolPerColumn?: number;
  /** Orientation of the legend */
  legendOrient?: LegendOrient;
}

/** * Generates a Vega-Lite specification for a stacked bar graph.
 * @param userOptions - Options for customizing the stacked bars visualization.
 * @returns A Vega-Lite specification object for rendering the stacked bars graph.
 */
export function getStackedBarsSpec(userOptions: StackedBarsSpecOptions): VisualizationSpec {
  const options = Object.assign(
    {
      fixedBars: 0,
      barWidth: 50,
      graphHeight: 650,
      tooltip: true,
      groupSpacing: 10,
      labelAngle: -25,
      legendSymbolLimit: 100,
      legendSymbolPerColumn: 30,
    },
    userOptions,
  );

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    data: {
      values: options.values,
    },
    width: {
      step: options.barWidth,
    },
    height: options.graphHeight,
    config: {
      font: 'Metropolis',
      axis: {
        titleColor: '#201E3D',
        titleFont: 'Metropolis',
        titleFontWeight: 500,
        titleFontSize: 14,
        titleLineHeight: 21,
        labelColor: '#4B4B5E',
        labelFont: 'Metropolis',
        labelFontWeight: 500,
        labelFontSize: 14,
        labelLineHeight: 21,
        labelAngle: -45,
        labelPadding: 6,
      },
      legend: {
        titleFontSize: 14,
        titleLineHeight: 21,
        titleColor: '#201E3D',
        titleFontWeight: 500,
        labelFontSize: 14,
        labelFontWeight: 500,
        labelColor: '#4B4B5E',
      },
    },
    mark: {
      type: 'bar',
    },
    encoding: {
      tooltip: [
        {
          field: options.xAxisField,
          type: 'nominal',
          title: GRAPH_ATTRIBUTE_LABELS[options.xAxisField] ?? options.xAxisField,
        },
        {
          field: options.yAxisField,
          aggregate: 'sum',
          title: GRAPH_ATTRIBUTE_LABELS[options.yAxisField] ?? options.yAxisField,
        },
        {
          field: options.legendField,
          type: 'nominal',
          title: GRAPH_ATTRIBUTE_LABELS[options.legendField] ?? options.legendField,
        },
        {
          field: 'cell_type_ontology_id',
          type: 'nominal',
          title: 'Cell Type Ontology ID',
        },
      ],
      facet:
        options.groupBy === ''
          ? undefined
          : {
              field: options.groupBy,
              title: GRAPH_ATTRIBUTE_LABELS[options.groupBy] ?? options.groupBy,
              type: 'ordinal',
              spacing: options.groupSpacing,
              sort: {
                field: 'order',
                op: 'mean',
                order: options.orderType,
              },
            },
      x: {
        field: options.xAxisField,
        title: GRAPH_ATTRIBUTE_LABELS[options.xAxisField] ?? options.xAxisField,
        sort: {
          field: 'order',
          op: 'sum',
          order: options.orderType,
        },
        type: 'nominal',
        axis: {
          labelAngle: options.labelAngle,
        },
      },
      y: {
        field: options.yAxisField,
        title: GRAPH_ATTRIBUTE_LABELS[options.yAxisField] ?? options.yAxisField,
        aggregate: 'sum',
        scale: {
          domain: getScaleDomain(options.yAxisField),
        },
      },
      color: {
        field: options.legendField,
        title: GRAPH_ATTRIBUTE_LABELS[options.legendField] ?? options.legendField,
        type: 'nominal',
        scale: {
          domain: options.legendDomain,
          range: options.legendRange,
        },
        legend: {
          symbolLimit: options.legendSymbolLimit,
          columns: Math.ceil(options.legendDomain.length / options.legendSymbolPerColumn),
          orient: options.legendOrient,
        },
      },
    },
    transform: [
      {
        joinaggregate: [
          {
            op: 'sum',
            field: options.yAxisField,
            as: 'Total',
          },
        ],
        groupby: [options.xAxisField],
      },
      {
        calculate: `datum.index < ${options.fixedBars} ?
        ${options.orderType === 'ascending' ? 0 : 'MAX_VALUE'} :
        '${options.sortBy}' === 'Total Cell Count' ? datum.${options.yAxisField} :
        '${options.sortBy}' === '${GRAPH_ATTRIBUTE_LABELS['y_pos']}' ? datum.y_pos :
        datum.cell_type === '${options.sortBy}' ? datum.${options.yAxisField} : 0`,
        as: 'order',
      },
      {
        calculate: `'${options.yAxisField}' == 'percentage' ? datum.${options.yAxisField}/datum.Total * 100 : datum.${options.yAxisField}`,
        as: options.yAxisField,
      },
    ],
    resolve: {
      scale: {
        x: 'independent',
      },
    },
  };
  return spec;
}

/** * Returns the scale domain for a given graph attribute.
 * @param attribute - Graph attribute to determine the scale domain for.
 * @returns An array representing the scale domain, or undefined if no specific domain is needed.
 */
function getScaleDomain(attribute: GraphAttribute): number[] | undefined {
  switch (attribute) {
    case 'percentage':
      return [0, 100];
    default:
      return undefined;
  }
}
