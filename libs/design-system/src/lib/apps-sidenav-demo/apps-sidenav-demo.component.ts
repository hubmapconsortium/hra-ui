import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppsCardComponent } from '../../../apps-card/src/index';
import { ScrollingModule } from '@hra-ui/design-system/scrolling';
import { HUBMAP_CARDS_DATA } from '@hra-ui/design-system/nav-header';

/** Apps Sidenav component */
@Component({
  selector: 'hra-apps-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, AppsCardComponent, MatIconModule, MatButtonModule, ScrollingModule],
  templateUrl: './apps-sidenav-demo.component.html',
  styleUrl: './apps-sidenav-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppsSidenavDemoComponent {
  /** data to render the cards inside the sidenav */
  readonly data = HUBMAP_CARDS_DATA;
}
