import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-footer-behavior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-behavior.component.html',
  styleUrls: ['./footer-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterBehaviorComponent {}
