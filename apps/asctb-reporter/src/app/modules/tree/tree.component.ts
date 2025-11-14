import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tree',
  standalone: false,
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
})
export class TreeComponent {
  @ViewChild('graph') treeElementRef!: ElementRef;
}
