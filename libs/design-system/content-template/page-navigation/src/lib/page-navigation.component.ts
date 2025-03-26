import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatTreeModule } from '@angular/material/tree';

export interface Section {
  name: string;
  children?: Section[];
}

@Component({
  selector: 'hra-navigation-item',
  templateUrl: './navigation-item.component.html',
})
export class NavigationItemComponent {
  readonly section = input.required<Section>();
  readonly level = input<number>(0);

  protected readonly navigationLink = computed(() => `/#${this.section().name.toLowerCase().replaceAll(' ', '-')}`);
}

@Component({
  selector: 'hra-page-navigation',
  imports: [CommonModule, MatTreeModule, NavigationItemComponent],
  templateUrl: './page-navigation.component.html',
  styleUrl: './page-navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationComponent {
  readonly tagline = input<string>('On this page');
  readonly sections = input<Section[]>([]);
}
