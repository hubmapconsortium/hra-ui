import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { dispatch, injectDestroy$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, ResourceRegistrySelectors as RRS } from '@hra-ui/cdk/state';
import {
  LandingPageInDepthComponent,
  LandingPageIntroComponent,
  MetricItem,
  MetricsComponent,
} from '@hra-ui/components/molecules';
import { LinkIds, ResourceIds as RIds, ResourceTypes as RTypes } from '@hra-ui/state';

/** Component for LandingPageContent Behavior */
@Component({
  selector: 'ftu-landing-page-content',
  standalone: true,
  imports: [CommonModule, LandingPageIntroComponent, MetricsComponent, LandingPageInDepthComponent],
  templateUrl: './landing-page-content.component.html',
  styleUrls: ['./landing-page-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContentComponent implements AfterViewInit {
  /** array of element refs for intersectables */
  @ViewChildren('intersectable', { read: ElementRef })
  readonly intersectableEls!: QueryList<ElementRef>;

  /** select snapshot for Landing Page title */
  readonly landingPageIntroTitle = selectQuerySnapshot(RRS.anyText, RIds.LandingPageTitle);

  /** select snapshot for landing page intro description */
  readonly landingPageIntroDescription = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDescription);
  /** select snapshot for landing page intro partners */
  readonly landingPageIntroPartners = selectQuerySnapshot(RRS.markdown, RIds.LandingPagePartners);

  /** select snapshot for landing page intro more text */
  readonly landingPageIntroMoreText = selectQuerySnapshot(RRS.anyText, RIds.LandingPageIntroMoreText);
  /** select snapshot for landing page intro img */
  readonly landingPageIntroImg = selectQuerySnapshot(RRS.url, RIds.LandingPageIntroImg);
  /** select snapshot for metrics */
  readonly metrics = selectQuerySnapshot(RRS.field, RIds.Metrics, RTypes.Metrics, 'metrics' as const, [])<MetricItem[]>;
  /** select snapshot for metrics title */
  readonly metricsTitle = selectQuerySnapshot(RRS.anyText, RIds.MetricsTitle);
  /** select snapshot for metrics logo */
  readonly metricsLogo = selectQuerySnapshot(RRS.url, RIds.MetricsLogo);
  /** select snapshot for landing page depth title */
  readonly landingPageDepthTitle = selectQuerySnapshot(RRS.anyText, RIds.LandingPageDepthTitle);
  /** select snapshot for landing page depth description */
  readonly landingPageDepthDescription = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDepthDescription);
  /** select snapshot forlanding page depth more text */
  readonly landingPageDepthMoreText = selectQuerySnapshot(RRS.anyText, RIds.LandingPageDepthMoreText);
  /** select snapshot for landing page depth img */
  readonly landingPageDepthImg = selectQuerySnapshot(RRS.url, RIds.LandingPageDepthImg);

  /** Disptach action for navigation */
  readonly navigate = dispatch(LinkRegistryActions.Navigate);

  /** Expose links for use it template */
  readonly LinkIds = LinkIds;

  /** Renderer to add class for animation */
  private readonly renderer = inject(Renderer2);
  /** destroys observer */
  private readonly destroy$ = injectDestroy$();

  /** creates an observer after view init */
  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      threshold: 0.18,
    });

    this.intersectableEls.forEach((el) => observer.observe(el.nativeElement));
    this.destroy$.subscribe(() => observer.disconnect());
  }

  /** callback function for intersection observer */
  handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
    for (const { isIntersecting, target } of entries) {
      if (isIntersecting) {
        this.renderer.addClass(target, 'visible');
        this.renderer.removeClass(target, 'hide');
        observer.unobserve(target);
      }
    }
  }
}
