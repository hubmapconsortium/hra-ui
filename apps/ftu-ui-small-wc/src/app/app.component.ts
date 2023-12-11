import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { dispatch, dispatch$, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { BaseHrefActions, createLinkId, LinkRegistryActions, ResourceRegistryActions } from '@hra-ui/cdk/state';
import {
  BiomarkerDetailsWcComponent,
  FooterBehaviorComponent,
  HeaderBehaviorComponent,
  HraLandingPageIntroWcBehaviourComponent,
  TissueLibraryBehaviorComponent,
} from '@hra-ui/components/behavioral';
import { FullscreenContainerComponent, FullscreenContentComponent } from '@hra-ui/components/molecules';
import { FTU_DATA_IMPL_ENDPOINTS, FtuDataImplEndpoints, setUrl, Url } from '@hra-ui/services';
import {
  ActiveFtuActions,
  ActiveFtuSelectors,
  IllustratorSelectors,
  ScreenModeAction,
  ScreenModeSelectors,
  TissueLibraryActions,
  TissueLibrarySelectors,
} from '@hra-ui/state';
import { ReplaySubject, tap } from 'rxjs';

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

  private readonly setBaseHref = dispatch(BaseHrefActions.Set);
  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly addMany = dispatch(LinkRegistryActions.AddMany);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize);
  private readonly reloadDataSets = dispatch(TissueLibraryActions.Load);
  private readonly reloadActiveFtu = dispatch(ActiveFtuActions.Load);

  private readonly reset = dispatch$(ActiveFtuActions.Reset);

  private readonly endpoints = inject(FTU_DATA_IMPL_ENDPOINTS) as ReplaySubject<FtuDataImplEndpoints>;

  ngOnInit() {
    const { baseHref } = this;
    this.setBaseHref(this.baseHref);
    this.loadLinks(setUrl(this.linksYamlUrl, baseHref));
    this.loadResources(setUrl(this.resourcesYamlUrl, baseHref));
    this.endpoints.next({
      illustrations: setUrl(this.illustrationsUrl, baseHref),
      datasets: setUrl(this.datasetUrl, baseHref),
      summaries: setUrl(this.summariesUrl, baseHref),
      baseHref: this.baseHref as Url,
    });
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
