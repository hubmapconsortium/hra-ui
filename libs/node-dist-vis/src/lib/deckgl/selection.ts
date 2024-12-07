import { computed, Signal } from '@angular/core';
import {
  AccessorFunction,
  CompositeLayer,
  CompositeLayerProps,
  DefaultProps,
  FilterContext,
  Layer,
  LayerContext,
  LayerData,
  LayersList,
  PickingInfo,
} from '@deck.gl/core/typed';
import { DataFilterExtension } from '@deck.gl/extensions/typed';
import { SolidPolygonLayer } from '@deck.gl/layers/typed';
import { AnyDataEntry, ViewMode } from '@hra-ui/node-dist-vis/models';
import {
  ClickEvent,
  DrawPolygonByDraggingMode,
  EditAction,
  FeatureCollection,
  ModeProps,
  PolygonCoordinates,
  StartDraggingEvent,
} from '@nebula.gl/edit-modes';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import { default as bbox } from '@turf/bbox';
import { BBox } from '@turf/helpers';
import { NodesLayer } from './nodes';
import { FILTER_EXCLUDE_VALUE, FILTER_INCLUDE_VALUE, FILTER_RANGE } from './utils/filters';

type _SelectionLayerProps = {
  nodesLayer?: NodesLayer;
  onSelect?: (infos: PickingInfo[]) => void;
};

export type SelectionLayerProps = _SelectionLayerProps & CompositeLayerProps;

enum SelectionSubLayerId {
  LassoLayer = 'lasso',
  MaskLayer = 'mask',
}

enum SelectionEditType {
  SetSelection = 'addFeature',
  ClearSelection = 'clearSelection',
}

type SelectionLayerState = {
  data: FeatureCollection;
  boundingBox?: BBox;
  mask?: PolygonCoordinates;
  selection?: unknown[];
};

const EMPTY_DATA: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

const EMPTY_STATE: SelectionLayerState = {
  data: EMPTY_DATA,
  boundingBox: undefined,
  mask: undefined,
  selection: undefined,
};

const defaultProps: DefaultProps<SelectionLayerProps> = {
  nodesLayer: undefined,
  onSelect: () => undefined,
  parameters: {
    depthTest: false,
  },
};

class ClickableDrawPolygonByDraggingMode extends DrawPolygonByDraggingMode {
  override handleClick(_event: ClickEvent, props: ModeProps<FeatureCollection>): void {
    props.onEdit({
      updatedData: EMPTY_DATA,
      editType: SelectionEditType.ClearSelection,
      editContext: undefined,
    });
  }

  override handleStartDragging(event: StartDraggingEvent, props: ModeProps<FeatureCollection>): void {
    const mouseEvent = event.sourceEvent as MouseEvent;
    if (mouseEvent.shiftKey) {
      this.handleDraggingThrottled = null;
    } else {
      super.handleStartDragging(event, props);
    }
  }
}

export class SelectionLayer<ExtraPropsT = object> extends CompositeLayer<Required<_SelectionLayerProps> & ExtraPropsT> {
  static override layerName = 'SelectionLayer';
  static override defaultProps = defaultProps;

  override initializeState(_context: LayerContext): void {
    this.state = { ...EMPTY_STATE };
  }

  override renderLayers(): Layer | null | LayersList {
    return [this.getLassoLayer(), this.getNodesLayer(), this.getMaskLayer()];
  }

  override filterSubLayer({ layer, isPicking }: FilterContext): boolean {
    return isPicking || layer.id.endsWith(SelectionSubLayerId.LassoLayer);
  }

  async getSelection(): Promise<PickingInfo[]> {
    const MAX_ROUNDS = 20;
    const { deck } = this.context;
    const { nodesLayer } = this.props;
    const { boundingBox } = this.state as SelectionLayerState;
    if (!deck || !nodesLayer || !boundingBox) {
      return [];
    }

    const [xMin, yMin, xMax, yMax] = boundingBox;
    const [x1, y1] = this.project([xMin, yMin]);
    const [x2, y2] = this.project([xMax, yMax]);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const { id: maskId } = this.getSubLayerProps({ id: SelectionSubLayerId.MaskLayer });
    const pickingOpts = { x, y, width, height, layerIds: [this.id] };
    const result: PickingInfo[] = [];
    let selection: AnyDataEntry[] = [];

    for (let round = 0; round < MAX_ROUNDS; round++) {
      this.setState({ selection } as SelectionLayerState);
      deck.redraw();
      await new Promise((res) => setTimeout(res, 16));

      const infos = deck.pickObjects(pickingOpts);
      const maskInfo = infos.find((info) => info.sourceLayer?.id === maskId);
      if (infos.length <= 1) {
        break;
      } else if (!maskInfo) {
        continue;
      }

      selection = [...selection];
      for (const info of infos) {
        if (info.sourceLayer?.id !== maskId) {
          result.push(info);
          selection.push(info.object);
        }
      }
    }

    return result;
  }

  clearSelection(): void {
    this.setState(EMPTY_STATE);
  }

  private getMaskLayer(): Layer {
    const { mask = [] } = this.state as SelectionLayerState;
    return new SolidPolygonLayer(this.getSubLayerProps({ id: SelectionSubLayerId.MaskLayer }), {
      pickable: true,
      data: [{ polygon: mask }],
    });
  }

  private getNodesLayer(): Layer {
    const { nodesLayer } = this.props;
    const { selection } = this.state as SelectionLayerState;
    const { id, getFilterValue, filterEnabled, filterRange, updateTriggers } = nodesLayer.props;
    const exclusionSet = new Set(selection);

    return nodesLayer.clone({
      ...this.getSubLayerProps({ id }),
      pickable: true,
      getFilterValue: (obj, info) => [
        (getFilterValue as AccessorFunction<AnyDataEntry, number>)(obj, info),
        exclusionSet.has(obj) ? FILTER_EXCLUDE_VALUE : FILTER_INCLUDE_VALUE,
      ],
      filterRange: [filterRange as [number, number], FILTER_RANGE],
      filterEnabled: filterEnabled !== false || exclusionSet.size > 0,
      extensions: [new DataFilterExtension({ filterSize: 2 })],
      updateTriggers: {
        ...updateTriggers,
        getFilterValue: [updateTriggers['getFilterValue'], selection],
      },
    });
  }

  private getLassoLayer(): Layer {
    const { data = EMPTY_DATA } = this.state as SelectionLayerState;

    return new EditableGeoJsonLayer(this.getSubLayerProps({ id: SelectionSubLayerId.LassoLayer }), {
      data: data as unknown as LayerData<FeatureCollection>,
      mode: ClickableDrawPolygonByDraggingMode,
      selectedFeatureIndexes: [],
      onEdit: (event) => this.handleEdit(event),

      getFillColor: [255, 255, 255, 51],
      getLineColor: [255, 255, 255, 255],
      getLineWidth: 2,
      getTentativeLineWidth: 2,

      _subLayerProps: {
        guides: {
          _subLayerProps: {
            'points-circle': {
              visible: false,
            },
          },
        },
      },
    });
  }

  private async handleEdit(event: EditAction<FeatureCollection>): Promise<void> {
    const { onSelect } = this.props;
    const { editType, updatedData: data } = event;
    if (editType === SelectionEditType.ClearSelection) {
      this.setState(EMPTY_STATE);
      onSelect([]);
    } else if (editType === SelectionEditType.SetSelection) {
      const boundingBox = bbox(data);
      const mask = this.createMaskPolygon(data, boundingBox);

      this.setState({ data, boundingBox, mask } satisfies SelectionLayerState);
      onSelect(await this.getSelection());
    }
  }

  private createMaskPolygon(data: FeatureCollection, boundingBox: BBox): PolygonCoordinates {
    const holes = data.features.flatMap((feat) => feat.geometry.coordinates as PolygonCoordinates);
    const adjust = 0.01;
    const xMin = (1 - adjust) * boundingBox[0];
    const yMin = (1 - adjust) * boundingBox[1];
    const xMax = (1 + adjust) * boundingBox[2];
    const yMax = (1 + adjust) * boundingBox[3];
    return [
      [
        [xMin, yMin],
        [xMax, yMin],
        [xMax, yMax],
        [xMin, yMax],
      ],
      ...holes,
    ];
  }
}

export function createSelectionLayer(
  mode: Signal<ViewMode>,
  nodesLayer: Signal<NodesLayer>,
  onSelect: (infos: PickingInfo[]) => void,
): Signal<SelectionLayer | undefined> {
  return computed(() => {
    if (mode() !== 'select') {
      return undefined;
    }

    return new SelectionLayer({
      id: 'selection',
      nodesLayer: nodesLayer(),
      onSelect,
    });
  });
}
