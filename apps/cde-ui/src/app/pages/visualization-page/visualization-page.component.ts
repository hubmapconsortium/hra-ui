import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationHeaderComponent } from '../../components/visualization-header/visualization-header.component';
import { Metadata, MetadataComponent } from '../../components/metadata/metadata.component';
import { CellTypeOption, CellTypesComponent } from '../../components/cell-types/cell-types.component';

/**
 * Component for visualization page
 */
@Component({
  selector: 'cde-visualization-page',
  standalone: true,
  imports: [CommonModule, VisualizationHeaderComponent, MetadataComponent, CellTypesComponent],
  templateUrl: './visualization-page.component.html',
  styleUrl: './visualization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisualizationPageComponent {
  /** Data for metadata comopnent */
  metadata: Metadata = {
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
  };

  /** Data for the Cell Type component */
  cellTypeOptionData: CellTypeOption[] = [
    { name: 'Hydrogen', count: 12323 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
    { name: 'Hydrogen', count: 12325 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
    { name: 'Hydrogen', count: 12325 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
    { name: 'Hydrogen', count: 12325 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
    { name: 'Hydrogen', count: 12325 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
    { name: 'Hydrogen', count: 12325 },
    { name: 'Helium', count: 1123 },
    { name: 'Lithium', count: 4422 },
    { name: 'Beryllium', count: 5656 },
    { name: 'Boron', count: 12325 },
    { name: 'Carbon', count: 234 },
    { name: 'Nitrogen', count: 765 },
    { name: 'Oxygen', count: 777 },
  ];
}
