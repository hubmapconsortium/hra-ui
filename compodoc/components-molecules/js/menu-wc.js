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
                    <a href="index.html" data-type="index-link">components-molecules</a>
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
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/BiomarkerTableDataCardComponent.html" data-type="entity-link" >BiomarkerTableDataCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BiomarkerTableDataIconComponent.html" data-type="entity-link" >BiomarkerTableDataIconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactModalComponent.html" data-type="entity-link" >ContactModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenContainerComponent.html" data-type="entity-link" >FullscreenContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenContentComponent.html" data-type="entity-link" >FullscreenContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HraLandingPageIntroWcComponent.html" data-type="entity-link" >HraLandingPageIntroWcComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoModalComponent.html" data-type="entity-link" >InfoModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InteractiveSvgComponent.html" data-type="entity-link" >InteractiveSvgComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageInDepthComponent.html" data-type="entity-link" >LandingPageInDepthComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageIntroComponent.html" data-type="entity-link" >LandingPageIntroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetricsComponent.html" data-type="entity-link" >MetricsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScreenSizeNoticeComponent.html" data-type="entity-link" >ScreenSizeNoticeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SourceListComponent.html" data-type="entity-link" >SourceListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueTreeListComponent.html" data-type="entity-link" >TissueTreeListComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TitleCardComponent.html" data-type="entity-link" >TitleCardComponent</a>
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
                                <a href="interfaces/ContactData.html" data-type="entity-link" >ContactData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataItem.html" data-type="entity-link" >DataItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataNode.html" data-type="entity-link" >DataNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DownloadFormat.html" data-type="entity-link" >DownloadFormat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InternalNode.html" data-type="entity-link" >InternalNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MetricItem.html" data-type="entity-link" >MetricItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeMapEntry.html" data-type="entity-link" >NodeMapEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NodeTooltipData.html" data-type="entity-link" >NodeTooltipData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SectionItem.html" data-type="entity-link" >SectionItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SourceListItem.html" data-type="entity-link" >SourceListItem</a>
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
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
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