import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BehaviorSubject, debounce, fromEventPattern, map, Observable, Subject, takeUntil, timer } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

import { svgDataSet, SvgNodeData } from './svg-models';

const HOVER_DELAY = 300;

const TOOLTIP_POSITIONS: [ConnectedPosition, ConnectedPosition, ConnectedPosition, ConnectedPosition] = [
  {
    panelClass: 'above',
    originX: 'center',
    originY: 'top',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -10,
  },
  {
    panelClass: 'below',
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 10,
  },
  {
    panelClass: 'left',
    originX: 'start',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -10,
  },
  {
    panelClass: 'right',
    originX: 'end',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 10,
  },
];

export interface NodeTooltipData {
  /** Node reference */
  node: SvgNodeData;
  /** Center point of hovered node in screen coordinates */
  origin: { x: number; y: number };
}

/**
 * Interactive SVG component
 */
@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, OverlayModule, MatDividerModule],
  templateUrl: './interactive-svg.component.html',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InteractiveSvgComponent implements OnDestroy {
  /** SVG url */
  @Input() url?: string;

  /** Node data mapping */
  @Input() svgNodeData: SvgNodeData[] = svgDataSet;

  /** Emits node id when hovered */
  @Output() readonly nodeHover = new EventEmitter<string>();

  /** SVG script eval mode */
  readonly scriptEvalMode = SVGScriptEvalMode.NEVER;

  private readonly renderer = inject(Renderer2);

  /** Destroys */
  private destroy$ = new Subject<void>();

  /** Observable of node hover data or undefined when there is no active hover */
  readonly nodeHoverObs = new BehaviorSubject<NodeTooltipData | undefined>(undefined);

  /** Observable of node hover with a timer */
  readonly nodeHover$ = this.nodeHoverObs.pipe(debounce((event) => timer(event ? HOVER_DELAY : 0)));

  positions = TOOLTIP_POSITIONS;

  /**
   * Clears observables on destroy
   */
  ngOnDestroy(): void {
    this.clear();
  }

  /**
   * Sets SVG element
   * @param el SVG element
   */
  setSvgElement(el: SVGElement): void {
    this.clear();
    const crosswalkEl = el.querySelector('[id^="Crosswalk"]');
    if (crosswalkEl) {
      // Move to front (i.e. last child in svg)
      this.renderer.appendChild(el, crosswalkEl);
      this.attachCrosswalkHover(crosswalkEl);
    }
  }

  /**
   * Attaches crosswalk hover
   * @param el element
   */
  private attachCrosswalkHover(el: Element): void {
    this.attachEvent(el, 'mouseover').subscribe(this.onCrosswalkHover.bind(this));
    this.attachEvent(el, 'mouseout')
      .pipe(map(() => undefined))
      .subscribe(this.nodeHoverObs); // TODO check that mouseout is the correct event
  }

  /**
   * Finds matching node in data from a hovered element
   * @param ev
   */
  private onCrosswalkHover(ev: MouseEvent): void {
    const target = ev.target as SVGElement;
    const data = this.findCrosswalkHoverTargetData(target);
    if (data) {
      this.nodeHover.emit(data.node_name);
      this.nodeHoverObs.next({
        node: data,
        origin: {
          x: ev.clientX,
          y: ev.clientY,
        },
      });
    }
  }

  private findCrosswalkHoverTargetData(target: SVGElement): SvgNodeData | undefined {
    let id = target.id;
    if (!id) {
      const parent = target.parentElement as HTMLElement;
      const index = Array.from(parent.children).indexOf(target);
      id = `${parent.id}_${index + 1}`;
    }

    id = this.decodeId(id).toLowerCase();
    return this.svgNodeData.find((data) => data.node_name.toLowerCase() === id);
  }

  /**
   * Clears observables
   */
  private clear(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = new Subject();
  }

  private decodeId(id: string): string {
    const replacer = (_match: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16));
    return id.replace(/_x([\da-f]+)_/gi, replacer);
  }

  private attachEvent<K extends keyof SVGElementEventMap>(el: Element, event: K): Observable<SVGElementEventMap[K]> {
    const { renderer, destroy$ } = this;
    const add = (handler: NodeEventHandler) => renderer.listen(el, event, handler);
    const remove = (_handler: NodeEventHandler, unlisten: () => void) => unlisten();
    return fromEventPattern<SVGElementEventMap[K]>(add, remove).pipe(takeUntil(destroy$));
  }
}
