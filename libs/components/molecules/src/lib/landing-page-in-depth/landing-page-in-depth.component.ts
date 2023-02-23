import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'hra-landing-page-in-depth',
  standalone: true,
  imports: [CommonModule, MarkdownModule, MatButtonModule, MatIconModule],
  templateUrl: './landing-page-in-depth.component.html',
  styleUrls: ['./landing-page-in-depth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageInDepthComponent {
  @Input() title = '';

  @Input() description = '';

  @Input() img = '';

  /** Text for more button */
  @Input() moreText = '';

  /** Emits when the more button is clicked */
  @Output() moreClick = new EventEmitter<void>();
}
