import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InlineSVGModule, SVGScriptEvalMode } from 'ng-inline-svg-2';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';

import { svgDataSet, SvgNodeData } from './svg-models';

/**
 * Interactive SVG component
 */
@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule, InlineSVGModule],
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
      el.appendChild(crosswalkEl);
      this.attachCrosswalkHover(crosswalkEl);
    }
  }

  /**
   * Attaches crosswalk hover
   * @param el element
   */
  private attachCrosswalkHover(el: Element): void {
    fromEvent(el, 'mouseover')
      .pipe(takeUntil(this.destroy$), tap(this.onCrosswalkHover.bind(this)))
      .subscribe();
  }

  /**
   * Finds matching node in data from a hovered element
   * @param ev
   */
  private onCrosswalkHover(ev: Event): void {
    const target = ev.target as SVGElement;
    this.findHoverMatch(target);
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
   * Checks for nodes on mouse hover and emits the matching node from mapping file
   * @param target target element
   */
  findHoverMatch(target: SVGElement): void {
    const targetId = target.id;

    const parentElement = target.parentElement;
    const parentId = parentElement ? parentElement.id : '';
    const parsedParentId = parentId.split('x5F_').join('');
    const parentNodeMatch = this.svgNodeData.find(
      (entry) =>
        parsedParentId === entry['node_name'] ||
        parsedParentId.includes(entry['node_name']) ||
        entry['node_name'].includes(parsedParentId)
    );

    if (targetId) {
      const parsedTargetId = targetId.split('x5F_').join('');
      const targetNodeMatch = this.svgNodeData.find((entry) => parsedTargetId === entry['node_name']);
      this.nodeHover.emit(targetNodeMatch?.node_name);
    } else if (parsedParentId !== '' && parentNodeMatch) {
      this.nodeHover.emit(parentNodeMatch.node_name);
    }
  }
}
