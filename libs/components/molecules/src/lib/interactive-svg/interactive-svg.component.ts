import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Papa } from 'ngx-papaparse';

import { allSvgs, SvgNodeData, svgMap } from './svg-models';

/**
 * Interactive SVG component
 */
@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-svg.component.html',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSvgComponent implements OnInit {
  /** name of SVG */
  @Input() fileName = '';

  /** Emits data for a node */
  @Output() nodeData = new EventEmitter<SvgNodeData>();

  /** All SVG data */
  svgNodeData: SvgNodeData[] = [];

  /** SVG file URL */
  fileURL = '';

  /**
   * Creates an instance of interactive svg component.
   * @param papa CSV parser
   * @param el Element ref
   * @param http HTTP service
   */
  constructor(private papa: Papa, private el: ElementRef, private http: HttpClient) {}

  /**
   * Fetches and renders SVG
   */
  ngOnInit(): void {
    this.svgNodeData = this.papa.parse(svgMap, { header: true }).data;
    this.fileURL = allSvgs[this.fileName] ? allSvgs[this.fileName].src : '';
    this.http.get(this.fileURL, { responseType: 'text' }).subscribe((svg) => {
      this.el.nativeElement.innerHTML = svg;
      this.bringToTopofSVG(document.querySelector('[id^="Crosswalk"]'));
    });
  }

  /**
   * Brings the Crosswalk group to the top layer of the SVG
   * @param targetElement Element to be moved
   */
  private bringToTopofSVG(targetElement: Element | null) {
    if (targetElement && targetElement.parentNode) {
      targetElement.parentNode.appendChild(targetElement);
    }
  }

  /**
   * Checks for nodes on mouse hover and emits the matching node from mapping file
   * @param target
   */
  @HostListener('mousemove', ['$event'])
  findHoverMatch(target: MouseEvent): void {
    const filteredMapData = this.svgNodeData.filter((entry) => entry['svg file of single 2DFTU'] === this.fileName);

    const targetElement = target.target as unknown as HTMLElement;
    const targetId = targetElement.id;
    const parsedTargetId = targetId.split('x5F_').join('');
    const targetNodeMatch = filteredMapData.find((entry) => parsedTargetId === entry['node_name']);

    const parentElement = targetElement.parentElement;
    const parentId = parentElement ? parentElement.id : '';
    const parsedParentId = parentId.split('x5F_').join('');
    const parentNodeMatch = filteredMapData.find(
      (entry) =>
        parsedParentId === entry['node_name'] ||
        parsedParentId.includes(entry['node_name']) ||
        entry['node_name'].includes(parsedParentId)
    );

    if (parsedTargetId !== '') {
      this.nodeData.emit(targetNodeMatch);
    } else if (parsedParentId !== '' && parentNodeMatch) {
      this.nodeData.emit(parentNodeMatch);
    }
  }
}
