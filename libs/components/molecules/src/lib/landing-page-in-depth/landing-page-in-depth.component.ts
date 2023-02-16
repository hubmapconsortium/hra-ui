import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-landing-page-in-depth',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page-in-depth.component.html',
  styleUrls: ['./landing-page-in-depth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageInDepthComponent {}
