import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderBehaviorComponent, LandingPageContentComponent } from '@hra-ui/components/behavioral';

@Component({
  selector: 'ftu-landing',
  standalone: true,
  imports: [CommonModule, HeaderBehaviorComponent, LandingPageContentComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
