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
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/HraStateModule.html" data-type="entity-link" >HraStateModule</a>
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
                                <a href="classes/ActiveFtuSelectors.html" data-type="entity-link" >ActiveFtuSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/AddEntry.html" data-type="entity-link" >AddEntry</a>
                            </li>
                            <li class="link">
                                <a href="classes/CellSummarySelectors.html" data-type="entity-link" >CellSummarySelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/Clear.html" data-type="entity-link" >Clear</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearEntries.html" data-type="entity-link" >ClearEntries</a>
                            </li>
                            <li class="link">
                                <a href="classes/ClearSelection.html" data-type="entity-link" >ClearSelection</a>
                            </li>
                            <li class="link">
                                <a href="classes/ComputeAggregates.html" data-type="entity-link" >ComputeAggregates</a>
                            </li>
                            <li class="link">
                                <a href="classes/Download.html" data-type="entity-link" >Download</a>
                            </li>
                            <li class="link">
                                <a href="classes/DownloadSelectors.html" data-type="entity-link" >DownloadSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/HighlightCellType.html" data-type="entity-link" >HighlightCellType</a>
                            </li>
                            <li class="link">
                                <a href="classes/IllustratorSelectors.html" data-type="entity-link" >IllustratorSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load-1.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load-2.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load-3.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load-4.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load-5.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterFormat.html" data-type="entity-link" >RegisterFormat</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reset.html" data-type="entity-link" >Reset</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reset-1.html" data-type="entity-link" >Reset</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reset-2.html" data-type="entity-link" >Reset</a>
                            </li>
                            <li class="link">
                                <a href="classes/Reset-3.html" data-type="entity-link" >Reset</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScreenModeSelectors.html" data-type="entity-link" >ScreenModeSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/SendMessage.html" data-type="entity-link" >SendMessage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Set.html" data-type="entity-link" >Set</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetClicked.html" data-type="entity-link" >SetClicked</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetHover.html" data-type="entity-link" >SetHover</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetIllustrationUrl.html" data-type="entity-link" >SetIllustrationUrl</a>
                            </li>
                            <li class="link">
                                <a href="classes/SetSize.html" data-type="entity-link" >SetSize</a>
                            </li>
                            <li class="link">
                                <a href="classes/SourceRefsSelectors.html" data-type="entity-link" >SourceRefsSelectors</a>
                            </li>
                            <li class="link">
                                <a href="classes/TissueLibrarySelectors.html" data-type="entity-link" >TissueLibrarySelectors</a>
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
                                    <a href="injectables/ActiveFtuState.html" data-type="entity-link" >ActiveFtuState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CellSummaryState.html" data-type="entity-link" >CellSummaryState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ContactState.html" data-type="entity-link" >ContactState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DownloadState.html" data-type="entity-link" >DownloadState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IllustratorState.html" data-type="entity-link" >IllustratorState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScreenModeState.html" data-type="entity-link" >ScreenModeState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SourceRefsState.html" data-type="entity-link" >SourceRefsState</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StateAnalyticsPluginService.html" data-type="entity-link" >StateAnalyticsPluginService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TissueLibraryState.html" data-type="entity-link" >TissueLibraryState</a>
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
                                <a href="interfaces/ActiveFtuModel.html" data-type="entity-link" >ActiveFtuModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CellSummaryModel.html" data-type="entity-link" >CellSummaryModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HraStateModuleOptions.html" data-type="entity-link" >HraStateModuleOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IllustratorModel.html" data-type="entity-link" >IllustratorModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScreenModeModel.html" data-type="entity-link" >ScreenModeModel</a>
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