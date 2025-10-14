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
                    <a href="index.html" data-type="index-link">Code Documentation for apps.humanatlas.io</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="index.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
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
                                <a href="components/ApiComponent.html" data-type="entity-link" >ApiComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BarGraphComponent.html" data-type="entity-link" >BarGraphComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BarGraphComponent-1.html" data-type="entity-link" >BarGraphComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CellPopulationGraphComponent.html" data-type="entity-link" >CellPopulationGraphComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CellPopulationPredictionsComponent.html" data-type="entity-link" >CellPopulationPredictionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CellPopulationPredictorComponent.html" data-type="entity-link" >CellPopulationPredictorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfigSelectorComponent.html" data-type="entity-link" >ConfigSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConfigSelectorComponent-1.html" data-type="entity-link" >ConfigSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmbeddedRuiComponent.html" data-type="entity-link" >EmbeddedRuiComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/EmbedSidenavContentComponent.html" data-type="entity-link" >EmbedSidenavContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HraPopVisualizerComponent.html" data-type="entity-link" >HraPopVisualizerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageComponent.html" data-type="entity-link" >LandingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServerSelectorComponent.html" data-type="entity-link" >ServerSelectorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SimilarAnatomicalStructuresTableComponent.html" data-type="entity-link" >SimilarAnatomicalStructuresTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SimilarDatasetsTableComponent.html" data-type="entity-link" >SimilarDatasetsTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueOriginPredictionsComponent.html" data-type="entity-link" >TissueOriginPredictionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueOriginPredictorComponent.html" data-type="entity-link" >TissueOriginPredictorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WebComponentsComponent.html" data-type="entity-link" >WebComponentsComponent</a>
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
                                    <a href="injectables/CellPopulationDataService.html" data-type="entity-link" >CellPopulationDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HraPopPredictionsService.html" data-type="entity-link" >HraPopPredictionsService</a>
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
                                <a href="interfaces/AnatomicalBarGraphSpecOptions.html" data-type="entity-link" >AnatomicalBarGraphSpecOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiEndpointsConfig.html" data-type="entity-link" >ApiEndpointsConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppIframeData.html" data-type="entity-link" >AppIframeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CellPopulationPredictionData.html" data-type="entity-link" >CellPopulationPredictionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataTypeConfig.html" data-type="entity-link" >DataTypeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExternalAppData.html" data-type="entity-link" >ExternalAppData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExtractionSiteDetails.html" data-type="entity-link" >ExtractionSiteDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RuiElement.html" data-type="entity-link" >RuiElement</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Server.html" data-type="entity-link" >Server</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SidenavData.html" data-type="entity-link" >SidenavData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortOption.html" data-type="entity-link" >SortOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StackedBarsSpecOptions.html" data-type="entity-link" >StackedBarsSpecOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TissuePredictionData.html" data-type="entity-link" >TissuePredictionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/XAxisOption.html" data-type="entity-link" >XAxisOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YAxisOption.html" data-type="entity-link" >YAxisOption</a>
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