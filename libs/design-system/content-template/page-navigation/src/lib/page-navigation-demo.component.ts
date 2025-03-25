import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-page-navigation-demo',
  imports: [CommonModule],
  templateUrl: './page-navigation-demo.component.html',
  styleUrl: './page-navigation-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNavigationDemoComponent {}
