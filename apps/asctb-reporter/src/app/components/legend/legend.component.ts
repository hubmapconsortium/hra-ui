import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { BimodalData } from '../../models/bimodal.model';
import { Error } from '../../models/response.model';
import { CompareData } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { LegendService } from '../../services/legend/legend.service';

@Component({
  selector: 'app-legend',
  imports: [CommonModule, ExpansionPanelModule, MatIconModule, OrderByPipe, MatExpansionModule],
  templateUrl: './legend.component.html',
  styleUrl: './legend.component.scss',
  providers: [LegendService],
})
export class LegendComponent implements OnChanges {
  readonly ls = inject(LegendService);

  // expose legend stream for the template via async pipe
  readonly legendList$ = this.ls.legendData$;

  @Input() treeData: TNode[] = [];
  @Input() bimodalData!: BimodalData;
  @Input() compareData: CompareData[] = [];
  @Input() error!: Error;

  ngOnChanges() {
    if (this.treeData && this.bimodalData) {
      if (this.treeData.length && this.bimodalData.nodes.length) {
        this.ls.makeLegendData(this.treeData, this.bimodalData.nodes, this.compareData);
      }
    }
  }
}
