import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { dispatch, dispatch$, select$, selectSnapshot } from '@hra-ui/cdk/injectors';
import { LinkRegistryActions, ResourceRegistryActions, createLinkId } from '@hra-ui/cdk/state';
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

  constructor() {
    this.setScreenSmall('small');
  }

  @Input() set linksYamlUrl(url: string) {
    this.loadLinks(url);
  }

  @Input() set resourcesYamlUrl(url: string) {
    this.loadResources(url);
  }

  @Input() set organIri(iri: string) {
    this.navigateToOrgan(createLinkId('FTU'), { queryParams: { id: iri } });
  }

  @Input() datasetUrl = '';
  @Input() illustrationsUrl = '';
  @Input() summariesUrl = '';

  @Output() readonly organSelected = select$(ActiveFtuSelectors.iri);

  @Output() readonly nodeHovered = select$(IllustratorSelectors.selectedOnHovered);

  @Output() readonly nodeClicked = select$(IllustratorSelectors.selectedOnClicked);

  private readonly loadLinks = dispatch(LinkRegistryActions.LoadFromYaml);
  private readonly loadResources = dispatch(ResourceRegistryActions.LoadFromYaml);
  private readonly navigateToOrgan = dispatch(LinkRegistryActions.Navigate);
  private readonly setScreenSmall = dispatch(ScreenModeAction.SetSize);
  private readonly reload_DataSets = dispatch(TissueLibraryActions.Load);
  private readonly reloadActiveFtu = dispatch(ActiveFtuActions.Load);

  private readonly reset = dispatch$(ActiveFtuActions.Reset);

  private readonly injector = inject(Injector);
  private endpoints?: FtuDataImplEndpoints; // = inject(FTU_DATA_IMPL_ENDPOINTS);

  ngOnInit() {
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.endpoints = this.injector.get(FTU_DATA_IMPL_ENDPOINTS);
    if ('dataset_EntryPoint' in changes) {
      this.endpoints.datasets = this.datasetUrl as Iri;
      this.endpoints.illustrations = this.illustrationsUrl as Iri;
      this.endpoints.summaries = this.summariesUrl as Iri;
      this.organIri = changes['organIri'].currentValue;
      this.reset()
        .pipe(
          tap(() => {
            this.reload_DataSets();
            this.reloadActiveFtu(changes['organIri'].currentValue);
          })
        )
        .subscribe();
    }
  }
}
