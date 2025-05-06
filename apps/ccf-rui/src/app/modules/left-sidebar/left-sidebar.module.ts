import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
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
    IconButtonSizeDirective,
    ButtonsModule,
    MicroTooltipDirective,
  ],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent],
})
export class LeftSidebarModule {}
