import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { MarkdownModule } from 'ngx-markdown';

/**
 * Page for displaying hra publication data
 */
@Component({
  selector: 'hra-publications-page',
  imports: [HraCommonModule, PageSectionComponent, SectionLinkComponent, MarkdownModule],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicationsPageComponent implements OnInit {
  /** Activated route service */
  private activatedRoute = inject(ActivatedRoute);

  /** Publication data */
  publications: Record<string, string[]> = {};

  /**
   * Returns publication years sorted in descending order
   */
  readonly years = computed(() => {
    const values = Object.keys(this.publications).sort((a, b) => (a < b ? 1 : -1));
    return values;
  });

  /**
   * Populates publication data on init
   */
  ngOnInit() {
    this.activatedRoute.data.subscribe(({ publications }) => {
      this.publications = publications;
    });
  }
}
