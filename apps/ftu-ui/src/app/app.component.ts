import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'ftu-ui-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class.mat-typography') readonly matTypography = true;
}
