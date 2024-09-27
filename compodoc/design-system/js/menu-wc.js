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
                    <a href="index.html" data-type="index-link">design-system</a>
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
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/ButtonModule.html" data-type="entity-link" >ButtonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' : 'data-bs-target="#xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' :
                                        'id="xs-directives-links-module-ButtonModule-a47b123ab05987a11a562cfd45eb5d2eef93ec6b252461785f1673324b4070ea003e0450ebc633feb1600c9ef58e981808b349b23b703cb488eb4de230195c81"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CallToActionButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CallToActionButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationCategoryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScrollingModule.html" data-type="entity-link" >ScrollingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ScrollingModule-0e5609eb9c1a950be135886a19896dcf9b158c1a2332a21d6fecbd1fa4aafa2d36c7fdaa442e84af865990334197a7dec16b3a3e8c6512283ce8f2b7df54e161"' : 'data-bs-target="#xs-directives-links-module-ScrollingModule-0e5609eb9c1a950be135886a19896dcf9b158c1a2332a21d6fecbd1fa4aafa2d36c7fdaa442e84af865990334197a7dec16b3a3e8c6512283ce8f2b7df54e161"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ScrollingModule-0e5609eb9c1a950be135886a19896dcf9b158c1a2332a21d6fecbd1fa4aafa2d36c7fdaa442e84af865990334197a7dec16b3a3e8c6512283ce8f2b7df54e161"' :
                                        'id="xs-directives-links-module-ScrollingModule-0e5609eb9c1a950be135886a19896dcf9b158c1a2332a21d6fecbd1fa4aafa2d36c7fdaa442e84af865990334197a7dec16b3a3e8c6512283ce8f2b7df54e161"' }>
                                        <li class="link">
                                            <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollOverflowFadeDirective</a>
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
                                <a href="components/AppLogosComponent.html" data-type="entity-link" >AppLogosComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppsCardComponent.html" data-type="entity-link" >AppsCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppsSidenavDemoComponent.html" data-type="entity-link" >AppsSidenavDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandLogoComponent.html" data-type="entity-link" >BrandLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandmarkComponent.html" data-type="entity-link" >BrandmarkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" >BreadcrumbsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonStylesComponent.html" data-type="entity-link" >ButtonStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonToggleStylesComponent.html" data-type="entity-link" >ButtonToggleStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorPickerComponent.html" data-type="entity-link" >ColorPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorIndicatorComponent.html" data-type="entity-link" >ErrorIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IconButtonStylesComponent.html" data-type="entity-link" >IconButtonStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InputStylesComponent.html" data-type="entity-link" >InputStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuDemoComponent.html" data-type="entity-link" >MenuDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuStylesComponent.html" data-type="entity-link" >MenuStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MicroTooltipStylesComponent.html" data-type="entity-link" >MicroTooltipStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavHeaderComponent.html" data-type="entity-link" >NavHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoticeComponent.html" data-type="entity-link" >NoticeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollbarStylesComponent.html" data-type="entity-link" >ScrollbarStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollOverflowFadeStylesComponent.html" data-type="entity-link" >ScrollOverflowFadeStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SelectStylesComponent.html" data-type="entity-link" >SelectStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SnackbarComponent.html" data-type="entity-link" >SnackbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" >SocialMediaButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepIndicatorComponent.html" data-type="entity-link" >StepIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableDemoComponent.html" data-type="entity-link" >TableDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableStylesComponent.html" data-type="entity-link" >TableStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TooltipCardComponent.html" data-type="entity-link" >TooltipCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeDemoComponent.html" data-type="entity-link" >TreeDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreeStylesComponent.html" data-type="entity-link" >TreeStylesComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#directives-links"' :
                                'data-bs-target="#xs-directives-links"' }>
                                <span class="icon ion-md-code-working"></span>
                                <span>Directives</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="directives-links"' : 'id="xs-directives-links"' }>
                                <li class="link">
                                    <a href="directives/BreadcrumbsSizeDirective.html" data-type="entity-link" >BreadcrumbsSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ButtonSizeDirective.html" data-type="entity-link" >ButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CallToActionButtonDirective.html" data-type="entity-link" >CallToActionButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconButtonSizeDirective.html" data-type="entity-link" >IconButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MicroTooltipDirective.html" data-type="entity-link" >MicroTooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NavigationCategoryButtonDirective.html" data-type="entity-link" >NavigationCategoryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/PrimaryButtonDirective.html" data-type="entity-link" >PrimaryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" >ScrollOverflowFadeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SecondaryButtonDirective.html" data-type="entity-link" >SecondaryButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SelectSizeDirective.html" data-type="entity-link" >SelectSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ToggleButtonSizeDirective.html" data-type="entity-link" >ToggleButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TreeSizeDirective.html" data-type="entity-link" >TreeSizeDirective</a>
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
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
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
                                <a href="interfaces/BreadcrumbConfig.html" data-type="entity-link" >BreadcrumbConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ButtonToggleConfig.html" data-type="entity-link" >ButtonToggleConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuDemoOption.html" data-type="entity-link" >MenuDemoOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NestedNode.html" data-type="entity-link" >NestedNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScollingOptions.html" data-type="entity-link" >ScollingOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollingGlobals.html" data-type="entity-link" >ScrollingGlobals</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackbarData.html" data-type="entity-link" >SnackbarData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableDemoData.html" data-type="entity-link" >TableDemoData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TooltipContent.html" data-type="entity-link" >TooltipContent</a>
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