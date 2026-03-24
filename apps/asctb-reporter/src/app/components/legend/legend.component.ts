import { Component, OnChanges, inject, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { HraCommonModule } from '@hra-ui/common';
import { AssetUrlPipe } from '@hra-ui/common/url';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { BimodalData } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { Error } from '../../models/response.model';
import { CompareData } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { LegendService } from '../../services/legend/legend.service';

/**
 * Legend component that displays a legend based on tree and bimodal data.
 * It uses the LegendService to generate legend items and applies styles and classes based on item properties.
 */
@Component({
  selector: 'app-legend',
  imports: [HraCommonModule, ExpansionPanelModule, OrderByPipe, MatExpansionModule, AssetUrlPipe],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
})
export class LegendComponent implements OnChanges {
  /** Legend service */
  readonly ls = inject(LegendService);

  // Expose legend stream for the template via async pipe
  readonly legendList$ = this.ls.legendData$;

  /** Tree data */
  readonly treeData = input<TNode[]>([]);
  /** Bimodal data */
  readonly bimodalData = input.required<BimodalData>();
  /** Compare data */
  readonly compareData = input<CompareData[]>();
  /** Error state */
  readonly error = input.required<Error>();

  /**
   * On changes, check if tree and bimodal data are available and non-empty, then generate legend data using the LegendService.
   */
  ngOnChanges() {
    if (this.treeData() && this.bimodalData()) {
      if (this.treeData().length && this.bimodalData().nodes.length) {
        this.ls.makeLegendData(this.treeData(), this.bimodalData().nodes, this.compareData());
      }
    }
  }

  /**
   * Get the appropriate styles for a legend item based on its properties.
   * @param item The legend item for which to compute styles
   * @returns An object containing CSS styles to apply to the legend item in the template
   */
  getLegendStyles(item: Legend): Record<string, unknown> {
    return {
      'background-color': item.style === 'stroke' ? 'transparent' : item.color,
      border: item.style === 'stroke' ? `3px solid ${item.color}` : 'none',
      'border-style': item.style === 'stroke' ? 'dotted' : 'none',
    };
  }

  /**
   * Determine if the legend item should be rendered as a rectangle or circle based on its name and properties.
   * @param item The legend item to evaluate
   * @returns An object with boolean properties 'rect' and 'circle' indicating the shape to render
   */
  getLegendClasses(item: Legend): Record<string, boolean> {
    const isRect = [
      'Protein Presence',
      'Protein Absence',
      'AS-AS, AS-CT, CT-BM Paths',
      'Intermediate Protein',
    ].includes(item.name);
    const isCircle = item.name === 'Gene Biomarkers' || (!item.bmType && !isRect);
    return { rect: isRect, circle: isCircle };
  }
}
