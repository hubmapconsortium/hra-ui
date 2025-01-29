import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';
import { MicroTooltipDirective } from '@hra-ui/design-system/micro-tooltip';
import { InfoButtonModule } from 'ccf-shared';

import { BlockSizeInputModule } from '../../shared/components/block-size-input/block-size-input.module';
import { RotationSliderModule } from '../../shared/components/rotation-slider/rotation-slider.module';
import { SlicesInputModule } from '../../shared/components/slices-input/slices-input.module';
import { TagListModule } from '../../shared/components/tag-list/tag-list.module';
import { TagSearchModule } from '../../shared/components/tag-search/tag-search.module';
import { ReviewButtonModule } from '../review/review-button/review-button.module';
import { RightSidebarComponent } from './right-sidebar.component';

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    BrowserAnimationsModule,

    BlockSizeInputModule,
    ReviewButtonModule,
    RotationSliderModule,
    SlicesInputModule,
    TagListModule,
    TagSearchModule,
    InfoButtonModule,

    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    ButtonsModule,
    IconButtonSizeDirective,
    MatDividerModule,
    MicroTooltipDirective,
  ],
  declarations: [RightSidebarComponent],
  exports: [RightSidebarComponent],
})
export class RightSidebarModule {}
