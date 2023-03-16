import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ScreenSizeNoticeComponent } from '@hra-ui/components/molecules';
import { dispatch } from '@hra-ui/cdk/injectors';

@Component({
  selector: 'ftu-screen-size-notice-behavior',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, MatButtonModule, ScreenSizeNoticeComponent],
  templateUrl: './screen-size-notice-behavior.component.html',
  styleUrls: ['./screen-size-notice-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenSizeNoticeBehaviorComponent {
  url = 'abcd';

  portalClick() {
    console.log('Portal Clicked');
  }

  proceedClick() {
    console.log('Proceed CLicked');
  }
}
