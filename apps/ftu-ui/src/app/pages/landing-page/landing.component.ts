import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { dispatch } from '@hra-ui/cdk/injectors';
import { LandingPageContentComponent } from '@hra-ui/components/behavioral';
import { ActiveFtuActions } from '@hra-ui/state';

@Component({
  selector: 'ftu-landing',
  imports: [CommonModule, LandingPageContentComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  constructor() {
    dispatch(ActiveFtuActions.Reset)();
  }
}
