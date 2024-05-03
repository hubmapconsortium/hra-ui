import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { CellTypeOption, CellTypesComponent } from '../components/cell-types/cell-types.component';
import { Metadata, MetadataComponent } from '../components/metadata/metadata.component';
import { VisualizationHeaderComponent } from '../components/visualization-header/visualization-header.component';
import { HistogramComponent } from '../histogram/histogram.component';

export interface Node {
  x: number;
  y: number;
  z?: number;
  cell_type: string;
  cell_ontology_id?: string;
}

export interface ColorMapItem {
  cell_type: string;
  cell_color: string;
}

const DEFAULT_CELL_TYPE_ANCHOR = 'Endothelial';

@Component({
  selector: 'cde-visualization',
  standalone: true,
  imports: [CommonModule, HistogramComponent, VisualizationHeaderComponent, MetadataComponent, CellTypesComponent],
  templateUrl: './cde-visualization.component.html',
  styleUrl: './cde-visualization.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CdeVisualizationComponent {
  readonly nodes = input<Node[]>([
    {
      x: 3450.144,
      y: 2933.142,
      cell_type: 'NK',
    },
    {
      x: 4492.808,
      y: 3564.456,
      cell_type: 'NK',
    },
    {
      x: 5256.62,
      y: 2724.436,
      cell_type: 'NK',
    },
    {
      x: 6570.342,
      y: 2044.626,
      cell_type: 'NK',
    },
    {
      x: 2688.064,
      y: 673.748,
      cell_type: 'MUC1+ Enterocyte',
    },
    {
      x: 3450.144,
      y: 2933.142,
      cell_type: 'T Cell',
    },
    {
      x: 4492.808,
      y: 3564.456,
      cell_type: 'B Cell',
    },
    {
      x: 5256.62,
      y: 2724.436,
      cell_type: 'Macrophage',
    },
    {
      x: 6570.342,
      y: 2044.626,
      cell_type: 'Dendritic Cell',
    },
    {
      x: 2688.064,
      y: 673.748,
      cell_type: 'Neutrophil',
    },
    {
      x: 7892.234,
      y: 4567.891,
      cell_type: 'Epithelial Cell',
    },
    {
      x: 2345.678,
      y: 9012.345,
      cell_type: 'Endothelial Cell',
    },
    {
      x: 6789.012,
      y: 3456.789,
      cell_type: 'Fibroblast',
    },
    {
      x: 1234.567,
      y: 8901.234,
      cell_type: 'Adipocyte',
    },
    {
      x: 5678.901,
      y: 2345.678,
      cell_type: 'Astrocyte',
    },
    {
      x: 9012.345,
      y: 6789.012,
      cell_type: 'Microglia',
    },
    {
      x: 3456.789,
      y: 1234.567,
      cell_type: 'Oligodendrocyte',
    },
    {
      x: 8901.234,
      y: 5678.901,
      cell_type: 'Pericyte',
    },
    {
      x: 2345.678,
      y: 9012.345,
      cell_type: 'Chondrocyte',
    },
    {
      x: 6789.012,
      y: 3456.789,
      cell_type: 'Osteocyte',
    },
  ]);

  readonly cellTypeAnchor = input<string>();

  readonly colorMap = input<ColorMapItem[]>();

  /** Data for metadata comopnent */
  readonly metadata = input<Metadata>({
    title: 'Sample 2D Visualization: Intestine',
    sourceData: 'intestine-codex-stanford.csv',
    colorMap: 'HRA-colormap.csv',
    organ: 'Intestine',
    technology: 'CODEX',
    sex: 'Male',
    age: 59,
    thickness: 0.5,
    pixelSize: 0.275,
    creationDate: 'March 14, 2024',
    creationTime: 'UTC 7:03:23',
  });

  readonly resolvedCellTypeAnchor = computed(() => {
    const anchor = this.cellTypeAnchor();
    if (anchor !== undefined) {
      return anchor;
    }

    const nodes = this.nodes();
    if (this.hasDefaultCellType(nodes)) {
      return DEFAULT_CELL_TYPE_ANCHOR;
    }

    return nodes[0].cell_type;
  });

  /** Data for the Cell Type component */
  readonly cellTypeOptions = computed(() => {
    const options: Record<string, CellTypeOption> = {};
    for (const { cell_type } of this.nodes()) {
      options[cell_type] ??= { name: cell_type, count: 0 };
      options[cell_type].count += 1;
    }

    return Object.values(options);
  });

  private hasDefaultCellType(nodes: Node[]): boolean {
    return nodes.some(({ cell_type }) => cell_type === DEFAULT_CELL_TYPE_ANCHOR);
  }
}
