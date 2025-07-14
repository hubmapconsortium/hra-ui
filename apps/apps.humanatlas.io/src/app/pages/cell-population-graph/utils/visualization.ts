import { LegendOrient } from 'vega';
import { VisualizationSpec } from 'vega-embed';
import { GraphAttribute, OrderType, getAttributeTitle } from '../models/parameters.model';

/**
 * Options for the stacked bars visualization specification.
 */
export interface StackedBarsSpecOptions {
  values: Record<string, any>[];
  xAxisField: GraphAttribute;
  yAxisField: GraphAttribute;
  sortBy: string;
  orderType: OrderType;
  groupBy: GraphAttribute;
  legendField: GraphAttribute;
  legendDomain: string[];
  legendRange: string[];
  fixedBars?: number;
  barWidth?: number;
  graphHeight?: number;
  tooltip?: boolean;
  groupSpacing?: number;
  labelAngle?: number;
  legendSymbolLimit?: number;
  legendSymbolPerColumn?: number;
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
          title: getAttributeTitle(options.xAxisField),
        },
        {
          field: options.yAxisField,
          aggregate: 'sum',
          title: getAttributeTitle(options.yAxisField),
        },
        {
          field: options.legendField,
          type: 'nominal',
          title: getAttributeTitle(options.legendField),
        },
        {
          field: 'cell_type_ontology_id',
          type: 'nominal',
          title: 'Cell Type Ontology ID',
        },
      ],
      facet:
        options.groupBy === GraphAttribute.None
          ? undefined
          : {
              field: options.groupBy,
              title: getAttributeTitle(options.groupBy),
              type: 'ordinal',
              spacing: options.groupSpacing,
              sort: {
                field: GraphAttribute.Order,
                op: 'mean',
                order: options.orderType,
              },
            },
      x: {
        field: options.xAxisField,
        title: getAttributeTitle(options.xAxisField),
        sort: {
          field: GraphAttribute.Order,
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
        title: getAttributeTitle(options.yAxisField),
        aggregate: 'sum',
        scale: {
          domain: getScaleDomain(options.yAxisField),
        },
      },
      color: {
        field: options.legendField,
        title: getAttributeTitle(options.legendField),
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
          ${options.orderType === OrderType.Ascending ? 0 : 'MAX_VALUE'} :
          '${options.sortBy}' === 'Total Cell Count' ? datum.${options.yAxisField} :
          '${options.sortBy}' === '${getAttributeTitle(GraphAttribute.YPosition)}' ? datum.${GraphAttribute.YPosition} :
          datum.${GraphAttribute.CellType} === '${options.sortBy}' ?
          datum.${options.yAxisField} : 0`,
        as: GraphAttribute.Order,
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
    case GraphAttribute.Percentage:
      return [0, 100];
    default:
      return undefined;
  }
}
