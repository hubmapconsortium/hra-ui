import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';
import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { OpacitySliderModule } from 'ccf-shared';

import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { VisibilityMenuModule } from '../../shared/components/visibility-menu/visibility-menu.module';
import { LeftSidebarComponent } from './left-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,

    MatDividerModule,
    NameInputModule,
    OpacitySliderModule,
    VisibilityMenuModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    IconButtonSizeDirective,
    ButtonModule,
    MicroTooltipDirective,
  ],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent],
})
export class LeftSidebarModule {}
