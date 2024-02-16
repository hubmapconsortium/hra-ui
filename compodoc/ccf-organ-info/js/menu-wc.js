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
                    <a href="index.html" data-type="index-link">ccf-organ-info</a>
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
                                            'data-bs-target="#components-links-module-AppModule-ed72eafce89849ccfbc5b3994c71fa3bb589780b39b7ca552046be8f6847975d303ade7c69f8a4214ada2f8b1c1756db296043ee6c7ac71cc091fb1b2bbc6558"' : 'data-bs-target="#xs-components-links-module-AppModule-ed72eafce89849ccfbc5b3994c71fa3bb589780b39b7ca552046be8f6847975d303ade7c69f8a4214ada2f8b1c1756db296043ee6c7ac71cc091fb1b2bbc6558"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ed72eafce89849ccfbc5b3994c71fa3bb589780b39b7ca552046be8f6847975d303ade7c69f8a4214ada2f8b1c1756db296043ee6c7ac71cc091fb1b2bbc6558"' :
                                            'id="xs-components-links-module-AppModule-ed72eafce89849ccfbc5b3994c71fa3bb589780b39b7ca552046be8f6847975d303ade7c69f8a4214ada2f8b1c1756db296043ee6c7ac71cc091fb1b2bbc6558"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppWebComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppWebComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LinkCardsModule.html" data-type="entity-link" >LinkCardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-LinkCardsModule-0fdfadd0872969e28becfdf5043feb1bc9572a5b32cace355d4723eee8260ebc6a9872f1673646494bc4d0c478125072b161cbf714f2963a8a4b3f8be3dc524c"' : 'data-bs-target="#xs-components-links-module-LinkCardsModule-0fdfadd0872969e28becfdf5043feb1bc9572a5b32cace355d4723eee8260ebc6a9872f1673646494bc4d0c478125072b161cbf714f2963a8a4b3f8be3dc524c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LinkCardsModule-0fdfadd0872969e28becfdf5043feb1bc9572a5b32cace355d4723eee8260ebc6a9872f1673646494bc4d0c478125072b161cbf714f2963a8a4b3f8be3dc524c"' :
                                            'id="xs-components-links-module-LinkCardsModule-0fdfadd0872969e28becfdf5043feb1bc9572a5b32cace355d4723eee8260ebc6a9872f1673646494bc4d0c478125072b161cbf714f2963a8a4b3f8be3dc524c"' }>
                                            <li class="link">
                                                <a href="components/LinkCardsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LinkCardsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrganModule.html" data-type="entity-link" >OrganModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-OrganModule-5af592d7955e5c758e47dee187c4ce65aa8bc15abd99dd62610b730671d9a4acfdefda41157d73a34ddd27cc99339f6c77b7a71c63f3494a32c76d2e12344669"' : 'data-bs-target="#xs-components-links-module-OrganModule-5af592d7955e5c758e47dee187c4ce65aa8bc15abd99dd62610b730671d9a4acfdefda41157d73a34ddd27cc99339f6c77b7a71c63f3494a32c76d2e12344669"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OrganModule-5af592d7955e5c758e47dee187c4ce65aa8bc15abd99dd62610b730671d9a4acfdefda41157d73a34ddd27cc99339f6c77b7a71c63f3494a32c76d2e12344669"' :
                                            'id="xs-components-links-module-OrganModule-5af592d7955e5c758e47dee187c4ce65aa8bc15abd99dd62610b730671d9a4acfdefda41157d73a34ddd27cc99339f6c77b7a71c63f3494a32c76d2e12344669"' }>
                                            <li class="link">
                                                <a href="components/OrganComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrganComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SlideToggleModule.html" data-type="entity-link" >SlideToggleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SlideToggleModule-a1ea3d4e37870bebc1ab0ea6a00272de7d3691c9bd8f1571a4bc2e6575630018e0befcbf0865e290b8f632655199e5c9ca098299da94b8cfdae878c814e873e4"' : 'data-bs-target="#xs-components-links-module-SlideToggleModule-a1ea3d4e37870bebc1ab0ea6a00272de7d3691c9bd8f1571a4bc2e6575630018e0befcbf0865e290b8f632655199e5c9ca098299da94b8cfdae878c814e873e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SlideToggleModule-a1ea3d4e37870bebc1ab0ea6a00272de7d3691c9bd8f1571a4bc2e6575630018e0befcbf0865e290b8f632655199e5c9ca098299da94b8cfdae878c814e873e4"' :
                                            'id="xs-components-links-module-SlideToggleModule-a1ea3d4e37870bebc1ab0ea6a00272de7d3691c9bd8f1571a4bc2e6575630018e0befcbf0865e290b8f632655199e5c9ca098299da94b8cfdae878c814e873e4"' }>
                                            <li class="link">
                                                <a href="components/SlideToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SlideToggleComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StatsListModule.html" data-type="entity-link" >StatsListModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-StatsListModule-abc5522ea392ef7eb9ee2e752408062bb9b347620e98f5ed7f660db3645500aa69fdc04dc1f8ff8b40089b98e34b8ee730aa3bac53b119c9d2796ea00b95f422"' : 'data-bs-target="#xs-components-links-module-StatsListModule-abc5522ea392ef7eb9ee2e752408062bb9b347620e98f5ed7f660db3645500aa69fdc04dc1f8ff8b40089b98e34b8ee730aa3bac53b119c9d2796ea00b95f422"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StatsListModule-abc5522ea392ef7eb9ee2e752408062bb9b347620e98f5ed7f660db3645500aa69fdc04dc1f8ff8b40089b98e34b8ee730aa3bac53b119c9d2796ea00b95f422"' :
                                            'id="xs-components-links-module-StatsListModule-abc5522ea392ef7eb9ee2e752408062bb9b347620e98f5ed7f660db3645500aa69fdc04dc1f8ff8b40089b98e34b8ee730aa3bac53b119c9d2796ea00b95f422"' }>
                                            <li class="link">
                                                <a href="components/StatsListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StatsListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/StoreModule.html" data-type="entity-link" >StoreModule</a>
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
                                    <a href="injectables/DelegateDataSourceService.html" data-type="entity-link" >DelegateDataSourceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OrganLookupService.html" data-type="entity-link" >OrganLookupService</a>
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
                                <a href="interfaces/DelegateDataSourceOptions.html" data-type="entity-link" >DelegateDataSourceOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalConfig.html" data-type="entity-link" >GlobalConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LinkCard.html" data-type="entity-link" >LinkCard</a>
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