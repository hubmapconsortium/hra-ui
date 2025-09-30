import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { HraCommonModule } from '@hra-ui/common';
import { ILNode } from '../../models/indent.model';
import { Row, Sheet } from '../../models/sheet.model';
import { SidenavHeaderComponent } from '../sidenav-header/sidenav-header.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { IndentedListService } from './indented-list.service';

interface Node {
  name: string;
  ontologyId: string;
  children?: Node[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  ontologyId: string;
  level: number;
}

@Component({
  selector: 'app-indent',
  imports: [
    CommonModule,
    SidenavModule,
    SidenavHeaderComponent,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    HraCommonModule,
  ],
  templateUrl: './indented-list.component.html',
  styleUrls: ['./indented-list.component.scss'],
})
export class IndentedListComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly indentService = inject(IndentedListService);

  indentData = [];
  activateNode?: unknown;
  visible = false;

  @Input() dataVersion?: unknown;
  @Input() currentSheet!: Sheet;
  @Input() sheetData: Row[] = [];
  @Output() readonly closeIL = new EventEmitter<void>();
  @Output() readonly openBottomSheet = new EventEmitter<{
    name: string;
    ontologyId: string;
  }>();

  @ViewChild('indentTree') indentTree!: MatTree<unknown>;

  hasChild = (_: number, node: FlatNode) => node.expandable;

  treeControl = new FlatTreeControl<FlatNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  private readonly transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      ontologyId: node.ontologyId,
      level,
    };
  };

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  ngOnInit(): void {
    this.indentService.indentData$.subscribe((data) => {
      if (data.data) {
        this.initializeTree(data.data);
        this.visible = true;
      } else {
        this.visible = false;
      }
    });

    this.indentService.makeIndentData(this.currentSheet, this.sheetData);
  }

  ngAfterViewInit(): void {
    if (this.indentTree) {
      this.indentTree.treeControl?.expandAll();
    }
  }

  ngOnDestroy() {
    this.visible = false;
  }

  initializeTree(data: ILNode) {
    this.dataSource.data = [data];
  }
}
