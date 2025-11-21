import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChild, effect, input, signal } from '@angular/core';
import { isObservable, Observable, of, Subject } from 'rxjs';
import { GalleryGridItemDirective } from './gallery-grid-item.directive';

/* Data source type for gallery grid */
export type GridDataSourceType<T> = DataSource<T> | Observable<readonly T[]> | readonly T[];

/** Gallery grid component */
@Component({
  selector: 'hra-gallery-grid',
  imports: [NgTemplateOutlet],
  templateUrl: './gallery-grid.component.html',
  styleUrl: './gallery-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryGridComponent<T> implements CollectionViewer {
  /** Data source for grid items */
  readonly dataSource = input.required<GridDataSourceType<T>>();

  /** Template directive for rendering items */
  protected readonly itemTemplate = contentChild.required(GalleryGridItemDirective, { read: GalleryGridItemDirective });

  /** Observable for view range changes */
  readonly viewChange = new Subject<ListRange>();

  /** Current items to display */
  protected readonly items = signal<readonly T[]>([]);

  /* Initializes the component */
  constructor() {
    effect((onCleanup) => {
      const source = this.dataSource();
      let stream$: Observable<readonly T[]>;

      if (this.isDataSource(source)) {
        stream$ = source.connect(this);
      } else {
        stream$ = isObservable(source) ? source : of(source);
      }

      const dataSubscription = stream$.subscribe((data) => this.items.set(data));

      onCleanup(() => {
        dataSubscription?.unsubscribe();
        if (this.isDataSource(source)) {
          source.disconnect(this);
        }
      });
    });
  }

  /** Type guard for DataSource interface */
  private isDataSource(value: unknown): value is DataSource<T> {
    return value !== null && typeof value === 'object' && 'connect' in value;
  }
}
