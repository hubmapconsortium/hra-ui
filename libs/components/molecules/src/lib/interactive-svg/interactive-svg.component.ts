import { OverlayModule } from '@angular/cdk/overlay';
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
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BehaviorSubject, debounce, fromEventPattern, map, Observable, Subject, takeUntil, timer } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

import { svgDataSet, SvgNodeData } from './svg-models';

const HOVER_DELAY = 300;

export interface NodeTooltipData {
  /** Node reference */
  node: string;
  /** Center point of hovered node in screen coordinates */
  origin: { x: number; y: number };
}

/**
 * Interactive SVG component
 */
@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, OverlayModule],
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

  hovering = false;

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
    this.attachEvent(el, 'mouseout').subscribe(this.onCrosswalkHoverOut.bind(this)); // TODO check that mouseout is the correct event
  }

  /**
   * Finds matching node in data from a hovered element
   * @param ev
   */
  private onCrosswalkHover(ev: MouseEvent): void {
    this.hovering = true;
    const target = ev.target as SVGElement;
    const id = this.findCrosswalkHoverTargetData(target);
    if (id) {
      this.nodeHover.emit(id);
      this.nodeHoverObs.next({
        node: id,
        origin: {
          x: ev.clientX,
          y: ev.clientY,
        },
      });
    }
  }

  private onCrosswalkHoverOut(): void {
    this.hovering = false;
    this.nodeHoverObs.next(undefined);
  }

  private findCrosswalkHoverTargetData(target: SVGElement): string | undefined {
    const parent = target.parentElement as HTMLElement;
    return this.decodeId(parent.id).split('_').join(' ');
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
