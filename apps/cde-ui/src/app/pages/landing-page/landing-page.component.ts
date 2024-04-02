import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualCardComponent } from '../../components/visual-card/visual-card.component';

@Component({
  selector: 'cde-landing-page',
  standalone: true,
  imports: [CommonModule, VisualCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {}
