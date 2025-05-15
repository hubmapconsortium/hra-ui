import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HraCommonModule } from '@hra-ui/common';

@Component({
  selector: 'hra-flex-container',
  imports: [HraCommonModule],
  templateUrl: './flex-container.component.html',
  styleUrl: './flex-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlexContainerComponent {}
