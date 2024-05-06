import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { TooltipComponent } from '@hra-ui/components/atoms';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { BehaviorSubject, debounce, fromEventPattern, Observable, Subject, takeUntil, timer } from 'rxjs';
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

/** Interface for node entries */
export interface NodeMapEntry {
  /** Node label */
  label: string;
  /** Node id in svg */
  id: string;
  /** Node group id */
  groupId: string;
  /** Ontology id of cell type */
  ontologyId: string;
}

/**
 * Interactive SVG component
 */
@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule, InlineSVGModule, OverlayModule, TooltipComponent],
  templateUrl: './interactive-svg.component.html',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class InteractiveSvgComponent<T extends NodeMapEntry> implements OnChanges, OnDestroy {
  /** SVG url */
  @Input() url?: string;

  /** Mapping info */
  @Input() mapping: T[] = [];

  /** Highlighted ontology id */
  @Input() highlightId?: string;

  /** Emits node id when hovered */
  @Output() readonly nodeHover = new EventEmitter<T>();

  /** Emits node id when clicked */
  @Output() readonly nodeClick = new EventEmitter<T>();

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

  /** Crosswalk element of svg */
  private crosswalkEl?: Element;

  /** List of highlighted svg elements */
  private highlightedElements: Element[] = [];

  /**
   * Updates the highlighting based on current highlight id
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if ('highlightId' in changes) {
      this.resetHighlight();
      this.setHighlight();
    }
  }

  /**
   * Highlights cells that match highlightId
   */
  private setHighlight() {
    const { mapping, highlightId, crosswalkEl } = this;
    const entry = mapping.find(({ ontologyId }) => ontologyId === highlightId);
    if (!entry || !crosswalkEl) {
      return;
    }

    const encodedId = this.encodeId(entry.id);
    const element = crosswalkEl.querySelector(`#${entry.id}, #${encodedId}`);
    if (!element) {
      return;
    }

    const gElement = element.nodeName === 'g' ? element : (element.parentElement as Element);
    const id = gElement.id;
    const elements = crosswalkEl.querySelectorAll(`#${id} :is(path, polygon, polyline)`);
    this.highlightedElements = Array.from(elements);
    elements.forEach((el) => el.classList.add('click-active'));
  }

  /**
   * Resets all highlighted elements in the svg
   */
  private resetHighlight(): void {
    for (const el of this.highlightedElements) {
      el.classList.remove('click-active');
    }
    this.highlightedElements = [];
  }

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
    this.crosswalkEl = el.querySelector('[id^="Crosswalk"]') ?? undefined;
    if (this.crosswalkEl) {
      // Move to front (i.e. last child in svg)
      this.renderer.appendChild(el, this.crosswalkEl);
      this.attachCrosswalkHover(this.crosswalkEl);
      this.setHighlight();
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
    this.attachEvent(el, 'mouseover').subscribe((event) => this.onCrosswalkHover(event));
    this.attachEvent(el, 'mouseout').subscribe(() => this.onCrosswalkHover(undefined as never as MouseEvent));
    this.attachEvent(el, 'click').subscribe((event) => this.nodeClick.emit(this.getNode(event)));
  }

  /**
   * Finds matching node in data from a hovered element
   * @param event Mouse event
   */
  private onCrosswalkHover(event: MouseEvent): void {
    if (event) {
      const node = this.getNode(event);
      if (node) {
        this.nodeHoverData$.next({
          node: node.label,
          origin: {
            x: event.clientX,
            y: event.clientY,
          },
        });
        this.nodeHover.emit(node); //emits node entry
      }
    } else {
      this.nodeHoverData$.next(undefined);
      this.nodeHover.emit();
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
   * Returns entry from mapping if target, parent, or grandparent id matches the node name
   * @param event Event
   * @returns Node entry that matches the target id
   */
  private getNode(event: Event): T | undefined {
    const targetId = (event.target as Element).id;
    const parentId = (event.target as Element).parentElement?.id ?? '';
    const grandparentId = (event.target as Element).parentElement?.parentElement?.id ?? '';
    const idCollection = [targetId, parentId, grandparentId];
    for (const id of idCollection) {
      const decodedID = this.decodeId(id);
      const cellMatch = this.mapping.find(
        (item) => item.id?.toLowerCase() === decodedID.toLowerCase(), //search mapping by cell name for matching node entry
      );
      if (cellMatch) {
        return cellMatch;
      } else {
        const groupMatch = this.mapping.find(
          (item) => item.groupId?.toLowerCase() === decodedID.toLowerCase(), //search mapping by group name for matching node entry
        );
        if (groupMatch) {
          return groupMatch;
        }
      }
    }
    return undefined;
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
   * Turns normal string into decoded SVG id
   * @param id id
   * @returns Encoded id
   */
  private encodeId(id: string): string {
    const replacer = (match: string) => `_x${match.charCodeAt(0).toString(16).toUpperCase()}_`;
    return id.replace(/[^a-z0-9-]/gi, replacer);
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
