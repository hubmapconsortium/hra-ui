import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ftu-contact-behavior',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-behavior.component.html',
  styleUrls: ['./contact-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactBehaviorComponent {}
