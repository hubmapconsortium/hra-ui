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

import { allSvgs, MapData, svgMap } from './svg-models';


@Component({
  selector: 'hra-interactive-svg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interactive-svg.component.html',
  styleUrls: ['./interactive-svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractiveSvgComponent implements OnInit {
  @Input() fileName = '';
  @Output() nodeData = new EventEmitter<MapData>();
  mapData: MapData[] = [];
  SVGFile = '';

  constructor(private papa: Papa, private el: ElementRef, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.mapData = this.papa.parse(svgMap, { header: true }).data;
    this.SVGFile = allSvgs[this.fileName] ? allSvgs[this.fileName].src : '';
    this.http.get(this.SVGFile, {responseType: 'text'}).subscribe(svg => {
      this.el.nativeElement.innerHTML = svg;
      this.bringToTopofSVG(document.querySelector('[id^="Crosswalk"]'));
    });
  }

  bringToTopofSVG(targetElement: Element | null){
    if (targetElement && targetElement.parentNode) {
      targetElement.parentNode.appendChild(targetElement);
    }
  }

  @HostListener('mousemove', ['$event'])
  findHoverMatch(target: MouseEvent): void {
    const filteredMapData = this.mapData.filter(entry => entry['svg file of single 2DFTU'] === this.fileName);

    const targetElement = target.target as unknown as HTMLElement;
    const targetId = targetElement.id;
    const parsedTargetId = targetId.split('x5F_').join('');
    const targetNodeMatch = filteredMapData.find(entry => parsedTargetId === entry['node_name']);

    const parentElement = targetElement.parentElement;
    const parentId = parentElement ? parentElement.id : '';
    const parsedParentId = parentId.split('x5F_').join('');
    const parentNodeMatch = filteredMapData.find(entry => 
      parsedParentId === entry['node_name'] || 
      parsedParentId.includes( entry['node_name']) || 
      entry['node_name'].includes(parsedParentId)
    );

    if (parsedTargetId !== '') {
      this.nodeData.emit(targetNodeMatch);
    } else if (parsedParentId !== '' && parentNodeMatch) {
      this.nodeData.emit(parentNodeMatch);
    }
  }
}
