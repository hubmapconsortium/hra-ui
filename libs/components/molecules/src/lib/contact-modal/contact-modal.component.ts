import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'hra-contact-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactModalComponent {}
