import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HraCommonModule } from '@hra-ui/common';
import { ButtonsModule } from '@hra-ui/design-system/buttons';
import {
  PageSectionComponent,
  providePageSectionNavigation,
} from '@hra-ui/design-system/content-templates/page-section';
import { Meta, StoryObj } from '@storybook/angular';
import { TableOfContentsComponent } from './table-of-contents.component';

@Component({
  imports: [HraCommonModule, MatIconModule, ButtonsModule, PageSectionComponent, TableOfContentsComponent],
  templateUrl: './table-of-contents-demo.component.html',
  styleUrl: './table-of-contents-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [providePageSectionNavigation()],
})
export class TableOfContentsDemoComponent {}

const meta: Meta<TableOfContentsComponent> = {
  component: TableOfContentsDemoComponent,
  title: 'Design System/Navigation/Table of Contents',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BCEJn9KCIbBJ5MzqnojKQp/HRA-Components?node-id=2571-207',
    },
  },
  args: {},
};
export default meta;
type Story = StoryObj<TableOfContentsComponent>;

export const Default: Story = {};
