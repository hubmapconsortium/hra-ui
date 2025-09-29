import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'hra-application',
  imports: [],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent {}
