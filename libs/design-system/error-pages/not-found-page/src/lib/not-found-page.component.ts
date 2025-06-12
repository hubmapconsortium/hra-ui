import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from '@hra-ui/design-system/buttons';

/**
 * Not Found Page Component
 * - Displays a 404 error page when the requested page is not found
 */
@Component({
  selector: 'hra-not-found-page',
  imports: [CommonModule, ButtonsModule, MatIconModule, RouterModule],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}
