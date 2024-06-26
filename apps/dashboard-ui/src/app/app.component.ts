import { Component, OnInit, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@hra-ui/design-system/footer';
import { HeaderComponent } from './components/header/header.component';
import { BaseHrefService } from './services/base-href.service';

/**
 * App Component
 */
@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  selector: 'hra-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly index = input<string>();
  readonly baseHref = input<string>('ui/dashboard-ui/');

  constructor(private baseHrefService: BaseHrefService) {}

  ngOnInit() {
    this.baseHrefService.setBaseHref(this.baseHref());
    console.log(this.baseHrefService.getBaseHref());
  }
}
