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
                    <a href="index.html" data-type="index-link">state</a>
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
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Add.html" data-type="entity-link" >Add</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddEntry.html" data-type="entity-link" >AddEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/CellSummarySelectors.html" data-type="entity-link" >CellSummarySelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearEntries.html" data-type="entity-link" >ClearEntries</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComputeAggregate.html" data-type="entity-link" >ComputeAggregate</a>
                            </li>
                            <li class="link">
                                <a href="classes/Download.html" data-type="entity-link" >Download</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadSelectors.html" data-type="entity-link" >DownloadSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadState.html" data-type="entity-link" >DownloadState</a>
                            </li>
                            <li class="link">
                                <a href="classes/MedicalIllustrationSelectors.html" data-type="entity-link" >MedicalIllustrationSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterFormat.html" data-type="entity-link" >RegisterFormat</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendMessage.html" data-type="entity-link" >SendMessage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Set.html" data-type="entity-link" >Set</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetActiveNode.html" data-type="entity-link" >SetActiveNode</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetData.html" data-type="entity-link" >SetData</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetMapping.html" data-type="entity-link" >SetMapping</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetUri.html" data-type="entity-link" >SetUri</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceListSelectors.html" data-type="entity-link" >SourceListSelectors</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CellSummaryState.html" data-type="entity-link" >CellSummaryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactState.html" data-type="entity-link" >ContactState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MedicalIllustrationState.html" data-type="entity-link" >MedicalIllustrationState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SourceListState.html" data-type="entity-link" >SourceListState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StateAnalyticsPluginService.html" data-type="entity-link" >StateAnalyticsPluginService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CellSummaryStateModel.html" data-type="entity-link" >CellSummaryStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GradientPoint.html" data-type="entity-link" >GradientPoint</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MedicalIllustrationModel.html" data-type="entity-link" >MedicalIllustrationModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Source.html" data-type="entity-link" >Source</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
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
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});