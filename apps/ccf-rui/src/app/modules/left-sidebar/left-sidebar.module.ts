import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OpacitySliderModule } from 'ccf-shared';

import { ExpansionPanelComponent, ExpansionPanelHeaderContentComponent } from '@hra-ui/design-system/expansion-panel';
import { ExtractionSetDropdownModule } from '../../shared/components/extraction-set-dropdown/extraction-set-dropdown.module';
import { NameInputModule } from '../../shared/components/name-input/name-input.module';
import { VisibilityMenuModule } from '../../shared/components/visibility-menu/visibility-menu.module';
import { LeftSidebarComponent } from './left-sidebar.component';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { ButtonModule } from '@hra-ui/design-system/button';

@NgModule({
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,

    MatDividerModule,
    NameInputModule,
    ExtractionSetDropdownModule,
    OpacitySliderModule,
    VisibilityMenuModule,
    ExpansionPanelComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    IconButtonSizeDirective,
    ButtonModule,
  ],
  declarations: [LeftSidebarComponent],
  exports: [LeftSidebarComponent],
})
export class LeftSidebarModule {}
