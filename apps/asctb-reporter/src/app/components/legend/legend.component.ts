import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ExpansionPanelModule } from '@hra-ui/design-system/expansion-panel';
import { delay } from 'rxjs';
import { BimodalData } from '../../models/bimodal.model';
import { Legend } from '../../models/legend.model';
import { Error } from '../../models/response.model';
import { CompareData } from '../../models/sheet.model';
import { TNode } from '../../models/tree.model';
import { OrderByPipe } from '../../pipes/order-by/order-by.pipe';
import { LegendService } from './legend.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
  imports: [CommonModule, ExpansionPanelModule, MatIconModule, OrderByPipe, MatExpansionModule],
  providers: [LegendService],
})
export class LegendComponent implements OnInit, OnChanges {
  readonly ls = inject(LegendService);

  legends: Legend[] = [];

  @Input() treeData: TNode[] = [];
  @Input() bimodalData!: BimodalData;
  @Input() compareData: CompareData[] = [];
  @Input() error!: Error;

  ngOnInit(): void {
    this.ls.legendData$.pipe(delay(0)).subscribe((data) => {
      if (data.length) {
        this.legends = data;
      }
    });
  }

  ngOnChanges() {
    if (this.treeData && this.bimodalData) {
      if (this.treeData.length && this.bimodalData.nodes.length) {
        this.ls.makeLegendData(this.treeData, this.bimodalData.nodes, this.compareData);
      }
    }
  }
}
