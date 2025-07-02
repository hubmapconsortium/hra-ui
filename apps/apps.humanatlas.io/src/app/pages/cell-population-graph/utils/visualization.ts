import { LegendOrient } from 'vega';
import { VisualizationSpec } from 'vega-embed';
import { GraphAttribute, OrderType, getAttributeTitle } from '../models/parameters.model';

export interface StackedBarsSpecOptions {
  graphTitle: string;
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
  graphTitleFontSize?: number;
}

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
      graphTitleFontSize: 18,
    },
    userOptions,
  );

  const spec: VisualizationSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
    data: {
      values: options.values,
    },
    width: {
      step: options.barWidth,
    },
    height: options.graphHeight,
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
    title: {
      text: options.graphTitle,
      anchor: 'middle',
      fontSize: options.graphTitleFontSize,
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

function getScaleDomain(attribute: GraphAttribute): number[] | undefined {
  switch (attribute) {
    case GraphAttribute.Percentage:
      return [0, 100];
    default:
      return undefined;
  }
}
