import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { CellTypeEntry } from '../models/cell-type';
import {
  ColorMapColorKey,
  ColorMapEntry,
  ColorMapTypeKey,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
  colorMapToLookup,
} from '../models/color-map';
import { DEFAULT_MAX_EDGE_DISTANCE, EdgeEntry } from '../models/edge';
import { Metadata } from '../models/metadata';
import { DEFAULT_NODE_TARGET_KEY, NodeEntry, NodeTargetKey, selectNodeTargetValue } from '../models/node';
import { ColorMapFileLoaderService } from '../services/data/color-map-loader.service';
import { DataLoaderService } from '../services/data/data-loader.service';
import { CsvFileLoaderService } from '../services/file-loader/csv-file-loader';
import { JsonFileLoaderService } from '../services/file-loader/json-file-loader';
import { brandAttribute, numberAttribute } from '../shared/attribute-transform';
import { createColorGenerator } from '../shared/color-generator';
import { mergeObjects } from '../shared/merge';

@Component({
  selector: 'cde-visualization-root',
  standalone: true,
  imports: [
    CommonModule,
    VisualizationHeaderComponent,
    MetadataComponent,
    CellTypesComponent,
    NodeDistVisualizationComponent,
    HistogramComponent,
  ],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  readonly nodes = input<string | NodeEntry[]>();
  readonly nodeTargetKey = input(undefined, { transform: brandAttribute<string, NodeTargetKey>() });
  readonly nodeTargetValue = input<string>();

  readonly edges = model<string | EdgeEntry[]>();
  readonly maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, {
    transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE),
  });

  readonly colorMap = model<string | ColorMapEntry[]>();
  readonly colorMapKey = input(undefined, { transform: brandAttribute<string, ColorMapTypeKey>() });
  readonly colorMapValueKey = input(DEFAULT_COLOR_MAP_VALUE_KEY, {
    transform: brandAttribute<string, ColorMapColorKey>(),
  });

  readonly metadata = input<string | Metadata>();
  readonly title = input<string>();
  readonly technology = input<string>();
  readonly organ = input<string>();
  readonly sex = input<string>();
  readonly age = input(undefined, { transform: numberAttribute() });
  readonly creationDate = input<string>();
  readonly creationTime = input<string>();
  readonly thickness = input(undefined, { transform: numberAttribute() });
  readonly pixelSize = input(undefined, { transform: numberAttribute() });

  private readonly dataLoader = inject(DataLoaderService);

  readonly loadedNodes = this.dataLoader.load(this.nodes, [], CsvFileLoaderService, {
    papaparse: { header: true, dynamicTyping: { x: true, y: true, z: true } },
  });
  readonly nodeTypeKey = computed(() => this.nodeTargetKey() ?? DEFAULT_NODE_TARGET_KEY);
  readonly selectedNodeTargetValue = computed(
    () => this.nodeTargetValue() ?? selectNodeTargetValue(this.loadedNodes(), this.nodeTypeKey()),
  );

  readonly loadedEdges = this.dataLoader.load(this.edges, [], CsvFileLoaderService, {
    papaparse: { dynamicTyping: true },
  });

  readonly loadedColorMap = this.dataLoader.load(this.colorMap, [], ColorMapFileLoaderService, {
    papaparse: { header: true },
  });
  readonly colorMapTypeKey = computed(
    () => this.colorMapKey() ?? (this.nodeTargetKey() as unknown as ColorMapTypeKey) ?? DEFAULT_COLOR_MAP_KEY,
  );
  private readonly colorMapLookup = computed(() =>
    colorMapToLookup(this.loadedColorMap(), this.colorMapTypeKey(), this.colorMapValueKey()),
  );

  readonly loadedMetadata = this.dataLoader.load(this.metadata, {}, JsonFileLoaderService, {});
  readonly mergedMetadata = computed(() =>
    mergeObjects(this.loadedMetadata(), {
      title: this.title(),
      technology: this.technology(),
      organ: this.organ(),
      sex: this.sex(),
      age: this.age(),
      creationDate: this.creationDate(),
      creationTime: this.creationTime(),
      thickness: this.thickness(),
      pixelSize: this.pixelSize(),
    }),
  );

  readonly cellTypes = signal<CellTypeEntry[]>([]);
  readonly cellTypesCreateRef = effect(
    () => {
      const nodes = this.loadedNodes();
      const targetKey = this.nodeTypeKey();
      const colorLookup = this.colorMapLookup();
      const defaultColorGenerator = createColorGenerator();
      const cellTypeByName: Record<string, CellTypeEntry> = {};

      for (const node of nodes) {
        const name = node[targetKey];
        cellTypeByName[name] ??= {
          name,
          count: 0,
          color: colorLookup.get(name) ?? defaultColorGenerator(),
        };
        cellTypeByName[name].count += 1;
      }

      this.cellTypes.set(Object.values(cellTypeByName));
    },
    { allowSignalWrites: true },
  );
}
