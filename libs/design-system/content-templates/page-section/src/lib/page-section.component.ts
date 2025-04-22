import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

/**
 * Header content for page section
 */
@Component({
  selector: 'hra-page-section-header',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionHeaderComponent {}

/**
 * Section content for page section
 */
@Component({
  selector: 'hra-page-section-content',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionContentComponent {}

/**
 * Section of page containing content and a section header
 */
@Component({
  selector: 'hra-page-section',
  imports: [CommonModule, MatDividerModule],
  templateUrl: './page-section.component.html',
  styleUrl: './page-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageSectionComponent {}
