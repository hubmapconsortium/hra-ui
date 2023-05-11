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
                    <a href="index.html" data-type="index-link">components-behavioral</a>
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
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/BiomarkerDetailsComponent.html" data-type="entity-link" >BiomarkerDetailsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactBehaviorComponent.html" data-type="entity-link" >ContactBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterBehaviorComponent.html" data-type="entity-link" >FooterBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderBehaviorComponent.html" data-type="entity-link" >HeaderBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageContentComponent.html" data-type="entity-link" >LandingPageContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MedicalIllustrationBehaviorComponent.html" data-type="entity-link" >MedicalIllustrationBehaviorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TissueLibraryBehaviorComponent.html" data-type="entity-link" >TissueLibraryBehaviorComponent</a>
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