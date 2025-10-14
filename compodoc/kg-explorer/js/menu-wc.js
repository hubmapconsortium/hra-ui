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
                    <a href="index.html" data-type="index-link">Code Documentation for kg-explorer</a>
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
                                <a href="modules/MetadataLayoutModule.html" data-type="entity-link" >MetadataLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MetadataLayoutModule-2398eca2409f07f72e43b43bda425c873b6c20bdd921daea9a77bd409f50f57cf139cf7094f7785d09b6e5d22c690108e74310b3844d27b642bd5d92bfd99025"' : 'data-bs-target="#xs-components-links-module-MetadataLayoutModule-2398eca2409f07f72e43b43bda425c873b6c20bdd921daea9a77bd409f50f57cf139cf7094f7785d09b6e5d22c690108e74310b3844d27b642bd5d92bfd99025"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MetadataLayoutModule-2398eca2409f07f72e43b43bda425c873b6c20bdd921daea9a77bd409f50f57cf139cf7094f7785d09b6e5d22c690108e74310b3844d27b642bd5d92bfd99025"' :
                                            'id="xs-components-links-module-MetadataLayoutModule-2398eca2409f07f72e43b43bda425c873b6c20bdd921daea9a77bd409f50f57cf139cf7094f7785d09b6e5d22c690108e74310b3844d27b642bd5d92bfd99025"' }>
                                            <li class="link">
                                                <a href="components/MetadataLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataLayoutContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataLayoutContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MetadataLayoutHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetadataLayoutHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
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
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterMenuComponent.html" data-type="entity-link" >FilterMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FilterMenuOverlayComponent.html" data-type="entity-link" >FilterMenuOverlayComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MainPageComponent.html" data-type="entity-link" >MainPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataLayoutComponent.html" data-type="entity-link" >MetadataLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataLayoutContentComponent.html" data-type="entity-link" >MetadataLayoutContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataLayoutHeaderComponent.html" data-type="entity-link" >MetadataLayoutHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MetadataPageComponent.html" data-type="entity-link" >MetadataPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProvenanceMenuComponent.html" data-type="entity-link" >ProvenanceMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VersionSelectorComponent.html" data-type="entity-link" >VersionSelectorComponent</a>
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
                                <a href="classes/CustomRouteReuseStrategy.html" data-type="entity-link" >CustomRouteReuseStrategy</a>
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
                                    <a href="injectables/DownloadService.html" data-type="entity-link" >DownloadService</a>
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
                                <a href="interfaces/CurrentFilters.html" data-type="entity-link" >CurrentFilters</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DigitalObjectInfoWithHraVersions.html" data-type="entity-link" >DigitalObjectInfoWithHraVersions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileTypeData.html" data-type="entity-link" >FileTypeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterFormValues.html" data-type="entity-link" >FilterFormValues</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterOption.html" data-type="entity-link" >FilterOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FilterOptionCategory.html" data-type="entity-link" >FilterOptionCategory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HelpMenuOptions.html" data-type="entity-link" >HelpMenuOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectTypeData.html" data-type="entity-link" >ObjectTypeData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TooltipData.html" data-type="entity-link" >TooltipData</a>
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