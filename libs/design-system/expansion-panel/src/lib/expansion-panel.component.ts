import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

let idCounter = 0;

@Component({
  selector: 'hra-expansion-panel-actions',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelActionsComponent {}

@Component({
  selector: 'hra-expansion-panel-header-content',
  standalone: true,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelHeaderContentComponent {}

@Component({
  selector: 'hra-expansion-panel',
  standalone: true,
  imports: [
    CommonModule,
    CdkAccordionModule,
    IconButtonSizeDirective,
    MatIconButton,
    MatIconModule,
    ExpansionPanelActionsComponent,
  ],
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelComponent {
  readonly title = input.required<string>();
  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly id = idCounter++;
  protected readonly titleId = `expansion-panel-title-${this.id}`;
}
