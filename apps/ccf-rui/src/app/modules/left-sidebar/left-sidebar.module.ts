import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { PlainTooltipDirective } from '@hra-ui/design-system/tooltips/plain-tooltip';
import { OpacitySliderModule } from 'ccf-shared';
import { VisibilityMenuComponent } from '../../shared/components/visibility-menu/visibility-menu.component';
import { LeftSidebarComponent } from './left-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,

    MatDividerModule,
    OpacitySliderModule,
    VisibilityMenuComponent,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    ButtonsModule,
    PlainTooltipDirective,
  ],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent],
})
export class LeftSidebarModule {}
