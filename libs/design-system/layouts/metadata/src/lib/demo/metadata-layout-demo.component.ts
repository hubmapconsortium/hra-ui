import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { MetadataLayoutModule } from '../metadata-layout.module';

/** Metadata layout demo */
@Component({
  selector: 'hra-metadata-layout-demo',
  imports: [CommonModule, MatIconModule, ButtonsModule, PageSectionComponent, MetadataLayoutModule],
  templateUrl: './metadata-layout-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetadataLayoutDemoComponent {}
