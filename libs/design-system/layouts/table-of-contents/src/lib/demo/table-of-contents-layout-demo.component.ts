import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { TableOfContentsLayoutModule } from '../table-of-contents-layout.module';

@Component({
  selector: 'hra-table-of-contents-layout-demo',
  imports: [CommonModule, MatIconModule, ButtonsModule, PageSectionComponent, TableOfContentsLayoutModule],
  templateUrl: './table-of-contents-layout-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableOfContentsLayoutDemoComponent {}
