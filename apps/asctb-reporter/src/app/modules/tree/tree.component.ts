import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  standalone: false,
})
export class TreeComponent {
  @ViewChild('graph') treeElementRef!: ElementRef;
}
