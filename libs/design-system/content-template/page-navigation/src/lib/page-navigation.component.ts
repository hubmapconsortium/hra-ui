import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';

@Component({
  selector: 'hra-navigation-item',
  templateUrl: './navigation-item.component.html',
})
export class NavigationItemComponent {
  readonly section = input.required<Section>();
  readonly level = input<number>(0);
}

export interface Section {
  name: string;
  children?: Section[];
}

const DATA: Section[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'hra-page-navigation',
  imports: [CommonModule, MatTreeModule, NavigationItemComponent],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationComponent {
  readonly tagline = input<string>('On this page');
  readonly sections = input<Section[]>(DATA);
}
