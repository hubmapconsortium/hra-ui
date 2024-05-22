import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, model } from '@angular/core';
import { CellTypesComponent } from '../components/cell-types/cell-types.component';
import { HistogramComponent } from '../components/histogram/histogram.component';
import { MetadataComponent } from '../components/metadata/metadata.component';
import { NodeDistVisualizationComponent } from '../components/node-dist-visualization/node-dist-visualization.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { CellType } from '../models/cell-type';
import { Rgb } from '../models/color';
import {
  ColorMapEntry,
  ColorMapKey,
  ColorMapValueKey,
  DEFAULT_COLOR_MAP_KEY,
  DEFAULT_COLOR_MAP_VALUE_KEY,
} from '../models/color-map';
import { DEFAULT_MAX_EDGE_DISTANCE, EdgeEntry } from '../models/edge';
import { Metadata } from '../models/metadata';
import { DEFAULT_NODE_TARGET_KEY, DEFAULT_NODE_TARGET_VALUE, NodeEntry, NodeTargetKey } from '../models/node';
import { DataService } from '../services/data/data.service';
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
  readonly nodeTargetKey = input(DEFAULT_NODE_TARGET_KEY, { transform: brandAttribute<string, NodeTargetKey>() });
  readonly nodeTargetValue = input<string>();

  readonly edges = model<string | EdgeEntry[]>();
  readonly maxEdgeDistance = input(DEFAULT_MAX_EDGE_DISTANCE, {
    transform: numberAttribute(DEFAULT_MAX_EDGE_DISTANCE),
  });

  readonly colorMap = model<string | ColorMapEntry[]>();
  readonly colorMapKey = input(DEFAULT_COLOR_MAP_KEY, { transform: brandAttribute<string, ColorMapKey>() });
  readonly colorMapValueKey = input(DEFAULT_COLOR_MAP_VALUE_KEY, {
    transform: brandAttribute<string, ColorMapValueKey>(),
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

  private readonly dataService = inject(DataService);

  readonly loadedNodes = this.dataService.load(this.nodes, [], CsvFileLoaderService, {
    papaparse: { header: true, dynamicTyping: { x: true, y: true, z: true } },
  });
  readonly loadedEdges = this.dataService.load(this.edges, [], CsvFileLoaderService, {
    papaparse: { dynamicTyping: true },
  });
  readonly loadedColorMap = this.dataService.load(this.colorMap, [], CsvFileLoaderService, {
    papaparse: { header: true },
  });
  readonly loadedMetadata = this.dataService.load(this.metadata, {}, JsonFileLoaderService, {});

  readonly selectedNodeTargetValue = computed(() => this.selectNodeTargetValue());
  readonly normalizedColorMap = computed(() => this.normalizeColorMap());
  readonly cellTypes = computed(() => this.createCellTypes());
  readonly cellTypesAll = computed(() => this.createCellTypesWithAll());
  readonly mergedMetadata = computed(() => this.mergeMetadata());

  private selectNodeTargetValue(): string {
    const value = this.nodeTargetValue();
    const defaultValue = DEFAULT_NODE_TARGET_VALUE;
    if (value) {
      return value;
    }

    const nodes = this.loadedNodes();
    if (nodes.length === 0) {
      return defaultValue;
    }

    const key = this.nodeTargetKey();
    const hasDefault = nodes.some((node) => node[key] === defaultValue);
    return hasDefault ? defaultValue : nodes[0][key];
  }

  private normalizeColorMap(): ColorMapEntry[] {
    const entries = this.loadedColorMap();
    const key = this.colorMapValueKey();
    if (entries.length === 0 || typeof entries[0][key] !== 'string') {
      return entries;
    }

    return entries.map((entry) => ({ ...entry, [key]: JSON.parse(`${entry[key]}`) }));
  }

  private getColorLookup(): (name: string) => Rgb {
    const colorMap = this.normalizedColorMap();
    const key = this.colorMapKey();
    const valueKey = this.colorMapValueKey();
    const colorByName: Record<string, Rgb> = {};
    const colorGenerator = createColorGenerator();

    for (const entry of colorMap) {
      colorByName[entry[key]] = entry[valueKey];
    }

    return (name) => colorByName[name] ?? colorGenerator();
  }

  private createCellTypes(): CellType[] {
    const nodes = this.loadedNodes();
    const key = this.nodeTargetKey();
    const getColor = this.getColorLookup();
    const cellTypeByName: Record<string, CellType> = {};

    for (const node of nodes) {
      const name = node[key];
      cellTypeByName[name] ??= { name, count: 0, color: getColor(name) };
      cellTypeByName[name].count += 1;
    }

    return Object.values(cellTypeByName);
  }

  private mergeMetadata(): Metadata {
    return mergeObjects(this.loadedMetadata(), {
      title: this.title(),
      technology: this.technology(),
      organ: this.organ(),
      sex: this.sex(),
      age: this.age(),
      creationDate: this.creationDate(),
      creationTime: this.creationTime(),
      thickness: this.thickness(),
      pixelSize: this.pixelSize(),
    });
  }

  private createCellTypesWithAll(): CellType[] {
    const sumAll = this.createCellTypes().reduce((sum, { count }) => sum + count, 0);
    return [{ name: 'All Cells', count: sumAll, color: [0, 0, 0] } as CellType].concat(this.createCellTypes());
  }
}
