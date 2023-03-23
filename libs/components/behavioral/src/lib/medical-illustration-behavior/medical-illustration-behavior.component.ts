import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InteractiveSvgComponent } from '@hra-ui/components/molecules';
import { MedicalIllustrationSelectors } from '@hra-ui/state';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';

@Component({
  selector: 'ftu-medical-illustration-behavior',
  standalone: true,
  imports: [CommonModule, InteractiveSvgComponent],
  templateUrl: './medical-illustration-behavior.component.html',
  styleUrls: ['./medical-illustration-behavior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalIllustrationBehaviorComponent {
  @ViewSelectSnapshot(MedicalIllustrationSelectors.getUrl)
  currentUrl?: string;

  nodeHovered(event: string): void {
    console.log(event);
  }
}
