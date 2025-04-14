import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HraCommonModule } from '@hra-ui/common';
import { PageSectionComponent } from '@hra-ui/design-system/content-templates/page-section';
import { SectionLinkComponent } from '@hra-ui/design-system/content-templates/section-link';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'hra-publications-page',
  imports: [HraCommonModule, PageSectionComponent, SectionLinkComponent, MarkdownModule],
  templateUrl: './publications-page.component.html',
  styleUrl: './publications-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PublicationsPageComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);

  publications: Record<string, string[]> = {};

  readonly years = computed(() => {
    const values = Object.keys(this.publications).sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });
    return values;
  });

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ publications }) => {
      this.publications = publications;
    });
  }
}
