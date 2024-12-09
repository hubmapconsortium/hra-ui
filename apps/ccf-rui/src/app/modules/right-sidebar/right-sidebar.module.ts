import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfoButtonModule } from 'ccf-shared';

import { BlockSizeInputModule } from '../../shared/components/block-size-input/block-size-input.module';
import { RegistrationMetadataModule } from '../../shared/components/registration-metadata/registration-metadata.module';
import { RotationSliderModule } from '../../shared/components/rotation-slider/rotation-slider.module';
import { SlicesInputModule } from '../../shared/components/slices-input/slices-input.module';
import { TagListModule } from '../../shared/components/tag-list/tag-list.module';
import { TagSearchModule } from '../../shared/components/tag-search/tag-search.module';
import { ReviewButtonModule } from '../review/review-button/review-button.module';
import { RightSidebarComponent } from './right-sidebar.component';
import {
  ExpansionPanelActionsComponent,
  ExpansionPanelComponent,
  ExpansionPanelHeaderContentComponent,
} from '@hra-ui/design-system/expansion-panel';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@hra-ui/design-system/button';
import { IconButtonSizeDirective } from '@hra-ui/design-system/icon-button';

@NgModule({
  imports: [
    CommonModule,

    MatExpansionModule,
    MatDividerModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatTooltipModule,

    BlockSizeInputModule,
    ReviewButtonModule,
    RotationSliderModule,
    SlicesInputModule,
    TagListModule,
    TagSearchModule,
    InfoButtonModule,
    RegistrationMetadataModule,

    ExpansionPanelComponent,
    ExpansionPanelActionsComponent,
    ExpansionPanelHeaderContentComponent,
    MatMenuModule,
    ButtonModule,
    IconButtonSizeDirective,
    MatDividerModule,
  ],
  declarations: [RightSidebarComponent],
  exports: [RightSidebarComponent],
})
export class RightSidebarModule {}
