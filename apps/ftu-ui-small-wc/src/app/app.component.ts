import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { dispatch, dispatch$, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { createLinkId, LinkRegistryActions, ResourceRegistryActions } from '@hra-ui/cdk/state';
import {
  BiomarkerDetailsWcComponent,
  FooterBehaviorComponent,
  HeaderBehaviorComponent,
  HraLandingPageIntroWcBehaviourComponent,
  TissueLibraryBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints, Iri } from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  IllustratorSelectors,
  ScreenModeAction,
  ScreenModeSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { tap } from 'rxjs';

@Component({
  selector: 'hra-root',
  imports: [
    HeaderBehaviorComponent,
    TissueLibraryBehaviorComponent,
    HraLandingPageIntroWcBehaviourComponent,
    BiomarkerDetailsWcComponent,
    FooterBehaviorComponent,
    FullscreenContainerComponent,
    FullscreenContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit, OnChanges {
  title = 'ftu-ui-small-wc';

  readonly isFullscreen = selectSnapshot(ScreenModeSelectors.isFullScreen);
  readonly tissues = select$(TissueLibrarySelectors.tissues);
  constructor() {
    this.setScreenSmall('small');
  }

  @Input() linksYamlUrl = '';

  @Input() resourcesYamlUrl = '';

  @Input() set organIri(iri: string) {
    iri ? this.navigateToOrgan(createLinkId('FTU'), { queryParams: { id: iri } }) : this.showDefaultIri();
  }

  @Input() datasetUrl = '';
  @Input() illustrationsUrl = '';
  @Input() summariesUrl = '';
  @Input() baseHref = '';

  @Output() readonly organSelected = select$(ActiveFtuSelectors.iri);

  @Output() readonly nodeHovered = select$(IllustratorSelectors.selectedOnHovered);

  @Output() readonly nodeClicked = select$(IllustratorSelectors.selectedOnClicked);

  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize);
  private readonly reloadDataSets = dispatch(TissueLibraryActions.Load);
  private readonly reloadActiveFtu = dispatch(ActiveFtuActions.Load);

  private readonly reset = dispatch$(ActiveFtuActions.Reset);

  private readonly injector = inject(Injector);
  private endpoints?: FtuDataImplEndpoints;

  ngOnInit() {
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
    this.loadLinks(this.setUrl(this.linksYamlUrl));
    this.loadResources(this.setUrl(this.resourcesYamlUrl));
    this.endpoints.illustrations = this.setUrl(this.illustrationsUrl);
    this.endpoints.datasets = this.setUrl(this.datasetUrl);
    this.endpoints.summaries = this.setUrl(this.summariesUrl);
    this.endpoints.baseHref = this.baseHref as Iri;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reset()
      .pipe(
        tap(() => {
          this.reloadDataSets();
          this.reloadActiveFtu(changes['organIri']?.currentValue);
        })
      )
      .subscribe();
  }

  private setUrl(url: string): Iri {
    if (url.slice(0, 4) === 'http') {
      return url as Iri;
    } else {
      return (this.baseHref + url) as Iri;
    }
  }

  showDefaultIri() {
    this.tissues
      .pipe(
        tap((nodes) => {
          for (const [key, { children }] of Object.entries(nodes)) {
            if (children.length > 0 && key) {
              this.organIri = children[0];
              break;
            }
          }
        })
      )
      .subscribe();
  }
}
