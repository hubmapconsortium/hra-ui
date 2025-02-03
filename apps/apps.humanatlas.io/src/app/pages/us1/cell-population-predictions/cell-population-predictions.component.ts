import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, viewChild, HostListener, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DeleteFileButtonComponent } from '@hra-ui/design-system/delete-file-button';
import { WorkflowCardModule } from '@hra-ui/design-system/workflow-card';
import { MatMenuModule } from '@angular/material/menu';
import { TooltipCardComponent, TooltipContent } from '@hra-ui/design-system/tooltip-card';
import { OverlayModule } from '@angular/cdk/overlay';
import { TOOLTIP_POSITION_RIGHT_SIDE } from '@hra-ui/cde-visualization';
import { Router } from '@angular/router';

/**
 * Prediction Result
 */
export interface Prediction {
  /**
   * Tool
   */
  tool: string;
  /**
   * Modality
   */
  modality: string;
  /**
   * Cell Type ID in Cell Ontology
   */
  cell_id: string;
  /**
   * Cell Name in Cell Ontology
   */
  cell_label: string;
  /**
   * Count
   */
  count: number;
  /**
   * Percentage
   */
  percentage: number;
}

/** Menu option interface */
export interface MenuOption {
  /** Name of option */
  name: string;
  /** Material icon name */
  icon: string;
  /** Options to open in a second menu */
  expandedOptions?: MenuOption[];
  /** Tooltip */
  tooltip?: TooltipContent[];
  /** Whether or not show tooltip */
  tooltipOpen?: boolean;
}

/** Router state interface for a file */
export interface RouterState {
  /** File object */
  file: File;
}

/**
 * Cell Population Predictions Result Page Component
 */
@Component({
  selector: 'hra-cell-population-predictions',
  standalone: true,
  imports: [
    CommonModule,
    WorkflowCardModule,
    MatIconModule,
    DeleteFileButtonComponent,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    TooltipCardComponent,
    OverlayModule,
  ],
  templateUrl: './cell-population-predictions.component.html',
  styleUrl: './cell-population-predictions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellPopulationPredictionsComponent {
  /**
   * Predictions
   */
  protected readonly predictions = input<Prediction[]>([]);

  /** Router service */
  private readonly router = inject(Router);

  /** State for accessing the file */
  protected readonly state = this.router.getCurrentNavigation()?.extras.state as RouterState;

  /**
   * For sorting Tools column
   */
  private readonly sort = viewChild.required(MatSort);

  /**
   * Data for predictions table
   */
  protected readonly dataSource = new MatTableDataSource<Prediction>([]);

  /**
   * Columns for prediction table
   */
  protected readonly displayedColumns: string[] = ['tool', 'modality', 'percentage', 'count', 'cell_label', 'cell_id'];

  /** Menu Options */
  protected readonly menuOptions: MenuOption[] = [
    {
      icon: 'info',
      name: 'Info',
      expandedOptions: [],
      tooltip: [
        {
          description:
            'Cell Population: Number of cells per cell type in a tissue block, anatomical structure, or extraction site. Cell summaries are computed from cell type counts in experimental datasets, obtained either via cell type annotations in the HRA Workflows Runner (for sc-transcriptomics datasets), or via expert/author-provided annotations (sc-proteomics datasets).',
        },
      ],
    },
    {
      icon: 'download',
      name: 'CSV',
    },
  ];

  /** Tooltip Position */
  protected readonly tooltipPosition = TOOLTIP_POSITION_RIGHT_SIDE;

  /**
   * Constructor that initializes the component and sets up effects for predictions and sorting
   */
  constructor() {
    effect(() => {
      this.dataSource.data = this.predictions();
    });

    effect(() => {
      this.dataSource.sort = this.sort();
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: BeforeUnloadEvent) {
    event.preventDefault();
    event.returnValue = true; // For older verions
  }

  onDeleteButtonClick(): void {
    const confirmation = window.confirm('Changes you made might not be saved. Do you really want to leave?');
    if (confirmation) {
      this.router.navigate(['/us1']);
    }
  }
}
