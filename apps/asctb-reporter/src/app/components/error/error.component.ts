import { Component, Input } from '@angular/core';
import { Error } from '../../models/response.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  standalone: false,
})
export class ErrorComponent {
  @Input() error!: Error;
}
