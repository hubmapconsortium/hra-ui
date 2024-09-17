import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { CsvFileLoaderService } from '@hra-ui/utils/file-loaders';
import { Subscription } from 'rxjs';
import { NodeEntry, NodeTargetKey } from '../models/nodes';

export type NodesInput = string | NodeEntry[] | undefined;

export interface NodesData {
  nodes: NodeEntry[];
  key: NodeTargetKey;
  value: string;
}

const EMPTY_DATA: NodesData = {
  nodes: [],
  key: '' as NodeTargetKey,
  value: '',
};

@Injectable()
export class NodeDataService {
  private url?: string;
  private data?: NodeEntry[];
  private key = EMPTY_DATA.key;
  private value = EMPTY_DATA.value;
  private subscription?: Subscription;
  private readonly csvFileLoader = inject(CsvFileLoaderService);
  private readonly nodeDataMut = signal(EMPTY_DATA);
  readonly nodeData = this.nodeDataMut.asReadonly();
  readonly nodes = computed(() => this.nodeData().nodes);

  constructor() {
    inject(DestroyRef).onDestroy(() => this.clear());
  }

  setInput(input: NodesInput, key: NodeTargetKey, value: string): void {
    if (input === undefined || Array.isArray(input)) {
      input ??= [];
      this.clear();
      this.setPositions(input);
      this.emit(input, key, value);
    } else if (input !== this.url) {
      this.clear();
      this.url = input;
      this.key = key;
      this.value = value;
      this.load(input);
    } else if (this.data) {
      this.emit(this.data, key, value);
    } else {
      this.key = key;
      this.value = value;
    }
  }

  private emit(nodes: NodeEntry[], key: NodeTargetKey, value: string): void {
    this.nodeDataMut.set({ nodes, key, value });
  }

  private load(url: string): void {
    this.subscription = this.csvFileLoader
      .load(url, {
        papaparse: {
          header: true,
          dynamicTyping: {
            x: true,
            y: true,
            z: true,
          },
        },
      })
      .subscribe((event) => {
        if (event.type === 'data') {
          this.data = event.data;
          this.setPositions(this.data);
          this.emit(this.data, this.key, this.value);
        }
      });
  }

  private setPositions(nodes: NodeEntry[]): void {
    for (const node of nodes) {
      node.position = [node.x ?? 0, node.y ?? 0, node.z ?? 0];
    }
  }

  private clear(): void {
    this.subscription?.unsubscribe();
    this.url = undefined;
    this.data = undefined;
    this.key = EMPTY_DATA.key;
    this.value = EMPTY_DATA.value;
    this.subscription = undefined;
  }
}
