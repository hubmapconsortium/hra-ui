import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  inject,
} from '@angular/core';
import { dispatch, injectDestroy$, selectQuerySnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, ResourceRegistrySelectors as RRS } from '@hra-ui/cdk/state';
import {
  LandingPageInDepthComponent,
  LandingPageIntroComponent,
  MetricItem,
  MetricsComponent,
} from '@hra-ui/components/molecules';
import { LinkIds, ResourceIds as RIds } from '@hra-ui/state';

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
  landingPageIntroTitle = selectQuerySnapshot(RRS.markdown, RIds.LandingPageTitle);

  /** select snapshot for landing page intro description */
  landingPageIntroDescription = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDescription);
  /** select snapshot for landing page intro partners */
  landingPageIntroPartners = selectQuerySnapshot(RRS.markdown, RIds.LandingPagePartners);

  /** select snapshot for landing page intro more text */
  landingPageIntroMoreText = selectQuerySnapshot(RRS.markdown, RIds.LandingPageIntroMoreText);
  /** select snapshot for landing page intro img */
  landingPageIntroImg = selectQuerySnapshot(RRS.url, RIds.LandingPageIntroImg);
  /** select snapshot for metrics */
  metrics = selectQuerySnapshot(RRS.query, RIds.Metrics);
  /** select snapshot for metrics title */
  metricsTitle = selectQuerySnapshot(RRS.text, RIds.MetricsTitle);
  /** select snapshot for metrics logo */
  metricsLogo = selectQuerySnapshot(RRS.url, RIds.MetricsLogo);
  /** select snapshot for landing page depth title */
  landingPageDepthTitle = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDepthTitle);
  /** select snapshot for landing page depth description */
  landingPageDepthDescription = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDepthDescription);
  /** select snapshot forlanding page depth more text */
  landingPageDepthMoreText = selectQuerySnapshot(RRS.markdown, RIds.LandingPageDepthMoreText);
  /** select snapshot for landing page depth img */
  landingPageDepthImg = selectQuerySnapshot(RRS.url, RIds.LandingPageDepthImg);

  /** Disptach action for navigation */
  navigate = dispatch(LinkRegistryActions.Navigate);
  /** Renderer to add class for animation */
  private readonly renderer = inject(Renderer2);
  /** destroys observer */
  private readonly destroy$ = injectDestroy$();

  /** get metrics for MetricsComponent */
  get metricItems(): MetricItem[] {
    const items = this.metrics()?.['metrics'] ?? [];
    return items as MetricItem[];
  }

  /** Function to explore FTU when moreClick event is emitted */
  exploreFTU(): void {
    this.navigate(LinkIds.ExploreFTU);
  }

  /** Function to read more when  moreClick from landingPageInDepth component is emitted */
  readMore(): void {
    this.navigate(LinkIds.LandingPageReadMore);
  }
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
        observer.unobserve(target);
      }
    }
  }
}
