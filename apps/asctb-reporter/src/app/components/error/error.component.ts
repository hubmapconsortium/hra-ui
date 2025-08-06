import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ErrorIndicatorComponent } from '@hra-ui/design-system/error-indicator';
import { Error } from '../../models/response.model';
@Component({
  selector: 'app-error',
  imports: [CommonModule, MatIconModule, ErrorIndicatorComponent],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  @Input() error!: Error;
}
