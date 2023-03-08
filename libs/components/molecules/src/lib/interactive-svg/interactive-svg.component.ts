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
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BehaviorSubject, debounce, fromEventPattern, map, Observable, Subject, takeUntil, timer } from 'rxjs';
import { NodeEventHandler } from 'rxjs/internal/observable/fromEvent';

/** Delay before tooltip becomes visible */
const HOVER_DELAY = 200;

/** Tooltip position settings */
const TOOLTIP_POSITIONS: ConnectedPosition[] = [
  {
    originX: 'center',
    originY: 'center',
    overlayX: 'start',
    overlayY: 'center',
    offsetX: 8,
  },
  {
    originX: 'center',
    originY: 'center',
    overlayX: 'end',
    overlayY: 'center',
    offsetX: -8,
  },
  {
    originX: 'center',
    originY: 'center',
    overlayX: 'center',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'center',
    originY: 'center',
    overlayX: 'center',
    overlayY: 'bottom',
    offsetY: -8,
  },
];

/** Node tooltip data */
export interface NodeTooltipData {
  /** Node name */
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

  /** Emits node id when hovered */
  @Output() readonly nodeHover = new EventEmitter<string>();

  /** SVG script eval mode */
  readonly NEVER_EVAL_SCRIPTS = SVGScriptEvalMode.NEVER;

  /** Tooltip position settings */
  readonly TOOLTIP_POSITIONS = TOOLTIP_POSITIONS;

  /** Observable of node hover data or undefined when there is no active hover */
  readonly nodeHoverData$ = new BehaviorSubject<NodeTooltipData | undefined>(undefined);

  /** Observable of node hover with a timer */
  readonly nodeHoverDelayedData$ = this.nodeHoverData$.pipe(debounce((event) => timer(event ? HOVER_DELAY : 0)));

  /** Custom renderer */
  private readonly renderer = inject(Renderer2);

  /** Destroys */
  private destroy$ = new Subject<void>();

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
   * Removes underscores from id
   * @param name Node name
   * @returns node name without underscores
   */
  formatNodeName(name: string): string {
    return name.replace(/_/g, ' ');
  }

  /**
   * Attaches crosswalk hover
   * @param el element
   */
  private attachCrosswalkHover(el: Element): void {
    this.attachEvent(el, 'mouseover').subscribe(this.onCrosswalkHover.bind(this));
    this.attachEvent(el, 'mouseout')
      .pipe(map(() => undefined))
      .subscribe(this.nodeHoverData$);
  }

  /**
   * Finds matching node in data from a hovered element
   * @param event Mouse event
   */
  private onCrosswalkHover(event: MouseEvent): void {
    const id = this.decodeId(this.getId(event));
    if (id) {
      this.nodeHover.emit(id);
      this.nodeHoverData$.next({
        node: id,
        origin: {
          x: event.clientX,
          y: event.clientY,
        },
      });
    }
  }

  /**
   * Clears observables
   */
  private clear(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$ = new Subject();
  }

  /**
   * Returns parent id from event target
   * @param event Event
   * @returns Parent id
   */
  private getId(event: Event): string {
    const parentEl = (event.target as Element).parentElement as Element;
    return parentEl.id;
  }

  /**
   * Decodes id into a normal string
   * @param id Undecoded ID
   * @returns id
   */
  private decodeId(id: string): string {
    const replacer = (_match: string, hex: string) => String.fromCharCode(Number.parseInt(hex, 16));
    return id.replace(/_x([\da-f]+)_/gi, replacer);
  }

  /**
   * Attaches an event listener
   * @template K
   * @param el Element
   * @param event Event
   * @returns Observable
   */
  private attachEvent<K extends keyof SVGElementEventMap>(el: Element, event: K): Observable<SVGElementEventMap[K]> {
    const { renderer, destroy$ } = this;
    const add = (handler: NodeEventHandler) => renderer.listen(el, event, handler);
    const remove = (_handler: NodeEventHandler, unlisten: () => void) => unlisten();
    return fromEventPattern<SVGElementEventMap[K]>(add, remove).pipe(takeUntil(destroy$));
  }
}
