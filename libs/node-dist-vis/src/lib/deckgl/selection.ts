import { computed, Signal } from '@angular/core';
import {
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
import { SolidPolygonLayer } from '@deck.gl/layers/typed';
import { ViewMode } from '@hra-ui/node-dist-vis/models';
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

type _SelectionLayerProps = {
  layerIds?: string[];
  onSelect?: (infos: PickingInfo[]) => void;
};

export type SelectionLayerProps = _SelectionLayerProps & CompositeLayerProps;

enum SelectionSubLayerId {
  MaskLayer = 'mask',
  LassoLayer = 'lasso',
}

enum SelectionEditType {
  SetSelection = 'addFeature',
  ClearSelection = 'clearSelection',
}

type SelectionLayerState = {
  data: FeatureCollection;
  boundingBox?: BBox;
  mask?: PolygonCoordinates;
};

const EMPTY_DATA: FeatureCollection = {
  type: 'FeatureCollection',
  features: [],
};

const EMPTY_STATE: SelectionLayerState = {
  data: EMPTY_DATA,
  boundingBox: undefined,
  mask: undefined,
};

const defaultProps: DefaultProps<SelectionLayerProps> = {
  layerIds: [],
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
    return [this.getSelectionLayer(), this.getMaskLayer()];
  }

  override filterSubLayer({ layer, isPicking }: FilterContext): boolean {
    return isPicking || !layer.id.endsWith(SelectionSubLayerId.MaskLayer);
  }

  getSelection(): PickingInfo[] {
    const { deck } = this.context;
    const { boundingBox } = this.state as SelectionLayerState;
    const { layerIds } = this.props;
    if (!deck || !boundingBox || layerIds.length === 0) {
      return [];
    }

    const [xMin, yMin, xMax, yMax] = boundingBox;
    const [x1, y1] = this.project([xMin, yMin]);
    const [x2, y2] = this.project([xMax, yMax]);
    const { id: maskId } = this.getSubLayerProps({ id: SelectionSubLayerId.MaskLayer });
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const selection = deck.pickObjects({ x, y, width, height, layerIds: [...layerIds, maskId] });
    return selection.filter((info) => info.layer?.id !== this.id);
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

  private getSelectionLayer(): Layer {
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

  private handleEdit(event: EditAction<FeatureCollection>): void {
    const { onSelect } = this.props;
    const { editType, updatedData: data } = event;
    if (editType === SelectionEditType.ClearSelection) {
      this.setState(EMPTY_STATE);
      onSelect([]);
    } else if (editType === SelectionEditType.SetSelection) {
      const boundingBox = bbox(data);
      const mask = this.createMaskPolygon(data, boundingBox);

      this.setState({ data, boundingBox, mask } satisfies SelectionLayerState);
      // Workaround since there is no way to register an after render callback in a layer
      setTimeout(() => {
        this.context.deck?.redraw();
        onSelect(this.getSelection());
      });
    }
  }

  private createMaskPolygon(data: FeatureCollection, boundingBox: BBox): PolygonCoordinates {
    const [xMin, yMin, xMax, yMax] = boundingBox;
    const holes = data.features.flatMap((feat) => feat.geometry.coordinates as PolygonCoordinates);
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
  onSelect: (infos: PickingInfo[]) => void,
): Signal<SelectionLayer | undefined> {
  return computed(() => {
    if (mode() !== 'select') {
      return undefined;
    }

    return new SelectionLayer({
      id: 'selection',
      layerIds: ['nodes'],
      onSelect,
    });
  });
}
