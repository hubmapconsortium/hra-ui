import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LandingPageContentComponent } from '@hra-ui/components/behavioral';

@Component({
  selector: 'ftu-landing',
  standalone: true,
  imports: [CommonModule, LandingPageContentComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {}
