import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-ftu-footer-behavioral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ftu-footer-behavioral.component.html',
  styleUrls: ['./ftu-footer-behavioral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FtuFooterBehavioralComponent {}
