'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">Code Documentation for ccf-eui</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-a9f864ee66896bdbb093c4ba9c88529e8e422f01804780f2cf34808c3389e760ed080d83b24a67d13490f3b5d62c703dcdd1a9ebc5a1ec3f8a341e8b6c1f5113"' : 'data-bs-target="#xs-components-links-module-AppModule-a9f864ee66896bdbb093c4ba9c88529e8e422f01804780f2cf34808c3389e760ed080d83b24a67d13490f3b5d62c703dcdd1a9ebc5a1ec3f8a341e8b6c1f5113"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a9f864ee66896bdbb093c4ba9c88529e8e422f01804780f2cf34808c3389e760ed080d83b24a67d13490f3b5d62c703dcdd1a9ebc5a1ec3f8a341e8b6c1f5113"' :
                                            'id="xs-components-links-module-AppModule-a9f864ee66896bdbb093c4ba9c88529e8e422f01804780f2cf34808c3389e760ed080d83b24a67d13490f3b5d62c703dcdd1a9ebc5a1ec3f8a341e8b6c1f5113"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppWebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppWebComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FiltersContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FiltersContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OntologySelectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OntologySelectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrganSelectComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganSelectComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResultsBrowserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResultsBrowserComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AutocompleteChipsFormComponent.html" data-type="entity-link" >AutocompleteChipsFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DonorCardComponent.html" data-type="entity-link" >DonorCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DualSliderComponent.html" data-type="entity-link" >DualSliderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FiltersContentComponent.html" data-type="entity-link" >FiltersContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataCardComponent.html" data-type="entity-link" >MetadataCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OntologySelectionComponent.html" data-type="entity-link" >OntologySelectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OntologyTreeComponent.html" data-type="entity-link" >OntologyTreeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/OrganSelectComponent.html" data-type="entity-link" >OrganSelectComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResultsBrowserComponent.html" data-type="entity-link" >ResultsBrowserComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchConfigBehaviorComponent.html" data-type="entity-link" >SpatialSearchConfigBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchConfigComponent.html" data-type="entity-link" >SpatialSearchConfigComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchInputsComponent.html" data-type="entity-link" >SpatialSearchInputsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchUiBehaviorComponent.html" data-type="entity-link" >SpatialSearchUiBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SpatialSearchUiComponent.html" data-type="entity-link" >SpatialSearchUiComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TermOccurrenceListComponent.html" data-type="entity-link" >TermOccurrenceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ThumbnailListComponent.html" data-type="entity-link" >ThumbnailListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueBlockListComponent.html" data-type="entity-link" >TissueBlockListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueSectionVisComponent.html" data-type="entity-link" >TissueSectionVisComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AddSearch.html" data-type="entity-link" >AddSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/DataStateSelectors.html" data-type="entity-link" >DataStateSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenerateSpatialSearch.html" data-type="entity-link" >GenerateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/MoveToNode.html" data-type="entity-link" >MoveToNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReallyUpdateSpatialSearch.html" data-type="entity-link" >ReallyUpdateSpatialSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/RemoveSearch.html" data-type="entity-link" >RemoveSearch</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetPosition.html" data-type="entity-link" >ResetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResetRadius.html" data-type="entity-link" >ResetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetExecuteSearchOnGenerate.html" data-type="entity-link" >SetExecuteSearchOnGenerate</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetOrgan.html" data-type="entity-link" >SetOrgan</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetPosition.html" data-type="entity-link" >SetPosition</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetRadius.html" data-type="entity-link" >SetRadius</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSelectedSearches.html" data-type="entity-link" >SetSelectedSearches</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSex.html" data-type="entity-link" >SetSex</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchFilterSelectors.html" data-type="entity-link" >SpatialSearchFilterSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/SpatialSearchUiSelectors.html" data-type="entity-link" >SpatialSearchUiSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/StartSpatialSearchFlow.html" data-type="entity-link" >StartSpatialSearchFlow</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateFilter.html" data-type="entity-link" >UpdateFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateSpatialSearch.html" data-type="entity-link" >UpdateSpatialSearch</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ColorAssignmentState.html" data-type="entity-link" >ColorAssignmentState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataState.html" data-type="entity-link" >DataState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListResultsState.html" data-type="entity-link" >ListResultsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OntologySearchService.html" data-type="entity-link" >OntologySearchService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResultsVirtualScrollStrategy.html" data-type="entity-link" >ResultsVirtualScrollStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SceneState.html" data-type="entity-link" >SceneState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchFilterState.html" data-type="entity-link" >SpatialSearchFilterState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchFlowService.html" data-type="entity-link" >SpatialSearchFlowService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpatialSearchUiState.html" data-type="entity-link" >SpatialSearchUiState</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppOptions.html" data-type="entity-link" >AppOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Color.html" data-type="entity-link" >Color</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorAssignmentStateModel.html" data-type="entity-link" >ColorAssignmentStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataStateModel.html" data-type="entity-link" >DataStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResult.html" data-type="entity-link" >ListResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ListResultsStateModel.html" data-type="entity-link" >ListResultsStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OntologySelection.html" data-type="entity-link" >OntologySelection</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RadiusSettings.html" data-type="entity-link" >RadiusSettings</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SceneStateModel.html" data-type="entity-link" >SceneStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchResult.html" data-type="entity-link" >SearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchFilterItem.html" data-type="entity-link" >SpatialSearchFilterItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SpatialSearchUiModel.html" data-type="entity-link" >SpatialSearchUiModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TermResult.html" data-type="entity-link" >TermResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});