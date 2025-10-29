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
                    <a href="index.html" data-type="index-link">Code Documentation for design-system</a>
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
                                <a href="modules/BrandModule.html" data-type="entity-link" >BrandModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-BrandModule-1039ab1af1268c475551b593ae5ebfa94f9a7ae5f740c8918adc9859e204fe06af2d01216f9b57047027a0bc7b4c6130a7bd1efd33d7edda804a2179fced66e4"' : 'data-bs-target="#xs-components-links-module-BrandModule-1039ab1af1268c475551b593ae5ebfa94f9a7ae5f740c8918adc9859e204fe06af2d01216f9b57047027a0bc7b4c6130a7bd1efd33d7edda804a2179fced66e4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BrandModule-1039ab1af1268c475551b593ae5ebfa94f9a7ae5f740c8918adc9859e204fe06af2d01216f9b57047027a0bc7b4c6130a7bd1efd33d7edda804a2179fced66e4"' :
                                            'id="xs-components-links-module-BrandModule-1039ab1af1268c475551b593ae5ebfa94f9a7ae5f740c8918adc9859e204fe06af2d01216f9b57047027a0bc7b4c6130a7bd1efd33d7edda804a2179fced66e4"' }>
                                            <li class="link">
                                                <a href="components/BrandLogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandLogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BrandMarkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BrandMarkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ButtonsModule.html" data-type="entity-link" >ButtonsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' : 'data-bs-target="#xs-components-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' :
                                            'id="xs-components-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' }>
                                            <li class="link">
                                                <a href="components/AppNavButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationCategoryToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryToggleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialMediaButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextHyperlinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' : 'data-bs-target="#xs-directives-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' :
                                        'id="xs-directives-links-module-ButtonsModule-b9e64bcbdc982e3a8d58dde8aeab3fc45491833159292c83558b09cf5e4f020368ab5e300749c04b652585a5288269a31ca352042bbfa7ca311ddbfa55bd69e3"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonToggleSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxErrorVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CtaButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CtaButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonDescriptionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonDescriptionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonTaglineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonTaglineDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationIconDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationIconDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TextHyperlinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CardsModule.html" data-type="entity-link" >CardsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CardsModule-4d80efd92e196fbf630b69257667d8c4d08ba28a9d668525a7618597c7631206c85e06c4888e19c4c6179f0bf3842d883072d96840d760c3e64319fd4fe60bb5"' : 'data-bs-target="#xs-components-links-module-CardsModule-4d80efd92e196fbf630b69257667d8c4d08ba28a9d668525a7618597c7631206c85e06c4888e19c4c6179f0bf3842d883072d96840d760c3e64319fd4fe60bb5"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CardsModule-4d80efd92e196fbf630b69257667d8c4d08ba28a9d668525a7618597c7631206c85e06c4888e19c4c6179f0bf3842d883072d96840d760c3e64319fd4fe60bb5"' :
                                            'id="xs-components-links-module-CardsModule-4d80efd92e196fbf630b69257667d8c4d08ba28a9d668525a7618597c7631206c85e06c4888e19c4c6179f0bf3842d883072d96840d760c3e64319fd4fe60bb5"' }>
                                            <li class="link">
                                                <a href="components/ActionCardActionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionCardActionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActionCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActionCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GalleryCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GalleryCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileCardComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ContentTemplatesModule.html" data-type="entity-link" >ContentTemplatesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ContentTemplatesModule-671cff0e0e5f55b9666996c44ce8f4f38a0820cb1fefbbe27a0158016e07174cebf71d814dd2dbeee2035ca397503bcf42398947d790d4e184108e03c71b02fe"' : 'data-bs-target="#xs-components-links-module-ContentTemplatesModule-671cff0e0e5f55b9666996c44ce8f4f38a0820cb1fefbbe27a0158016e07174cebf71d814dd2dbeee2035ca397503bcf42398947d790d4e184108e03c71b02fe"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ContentTemplatesModule-671cff0e0e5f55b9666996c44ce8f4f38a0820cb1fefbbe27a0158016e07174cebf71d814dd2dbeee2035ca397503bcf42398947d790d4e184108e03c71b02fe"' :
                                            'id="xs-components-links-module-ContentTemplatesModule-671cff0e0e5f55b9666996c44ce8f4f38a0820cb1fefbbe27a0158016e07174cebf71d814dd2dbeee2035ca397503bcf42398947d790d4e184108e03c71b02fe"' }>
                                            <li class="link">
                                                <a href="components/AppLabelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppLabelComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageSectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageSectionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UiSectionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiSectionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ErrorPagesModule.html" data-type="entity-link" >ErrorPagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ErrorPagesModule-0de1f59f9e043198c601776f4a85b16c1104bc1825894c4296f7fe7e1e384946faaff9f158737c505b99df86f0386bafe3c7017041e09b6b7fef82faf3e6e9a0"' : 'data-bs-target="#xs-components-links-module-ErrorPagesModule-0de1f59f9e043198c601776f4a85b16c1104bc1825894c4296f7fe7e1e384946faaff9f158737c505b99df86f0386bafe3c7017041e09b6b7fef82faf3e6e9a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ErrorPagesModule-0de1f59f9e043198c601776f4a85b16c1104bc1825894c4296f7fe7e1e384946faaff9f158737c505b99df86f0386bafe3c7017041e09b6b7fef82faf3e6e9a0"' :
                                            'id="xs-components-links-module-ErrorPagesModule-0de1f59f9e043198c601776f4a85b16c1104bc1825894c4296f7fe7e1e384946faaff9f158737c505b99df86f0386bafe3c7017041e09b6b7fef82faf3e6e9a0"' }>
                                            <li class="link">
                                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExpansionPanelModule.html" data-type="entity-link" >ExpansionPanelModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-ExpansionPanelModule-17d413bf76847d240a5f155d04a8a0984a5c9998bdfcaeef128b4242972a37b15fccc7931dbab683f5fd03f7310330a81c75ec7b81d5a8b46ce66eb3445dc685"' : 'data-bs-target="#xs-components-links-module-ExpansionPanelModule-17d413bf76847d240a5f155d04a8a0984a5c9998bdfcaeef128b4242972a37b15fccc7931dbab683f5fd03f7310330a81c75ec7b81d5a8b46ce66eb3445dc685"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ExpansionPanelModule-17d413bf76847d240a5f155d04a8a0984a5c9998bdfcaeef128b4242972a37b15fccc7931dbab683f5fd03f7310330a81c75ec7b81d5a8b46ce66eb3445dc685"' :
                                            'id="xs-components-links-module-ExpansionPanelModule-17d413bf76847d240a5f155d04a8a0984a5c9998bdfcaeef128b4242972a37b15fccc7931dbab683f5fd03f7310330a81c75ec7b81d5a8b46ce66eb3445dc685"' }>
                                            <li class="link">
                                                <a href="components/ExpansionPanelComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExpansionPanelComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FlatCardModule.html" data-type="entity-link" >FlatCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' : 'data-bs-target="#xs-components-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' :
                                            'id="xs-components-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' }>
                                            <li class="link">
                                                <a href="components/AppNavButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationCategoryToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryToggleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialMediaButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextHyperlinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' : 'data-bs-target="#xs-directives-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' :
                                        'id="xs-directives-links-module-FlatCardModule-76f695dadd63cb686932e79dae5f1ac98eabfcdaa09a39dd23d9d35ee74ba87b0e86dcb66da36cff11e3b08898408f43ccca373077f6f9ff6e9837c4571f9e62"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonToggleSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxErrorVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CtaButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CtaButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonDescriptionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonDescriptionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonTaglineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonTaglineDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationIconDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationIconDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TextHyperlinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IconButtonModule.html" data-type="entity-link" >IconButtonModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' : 'data-bs-target="#xs-directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' :
                                        'id="xs-directives-links-module-IconButtonModule-e73b1277b11d49efd817b47b3dc2d0f39a94adc58047dfb9cbfe072de3d28d676a42bb265f3d26fcd23bc91dbad3f6f6181240ea28058483e09dcb73ac8b8b16"' }>
                                        <li class="link">
                                            <a href="directives/IconButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/IconButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconButtonVariantDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/IconsModule.html" data-type="entity-link" >IconsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-IconsModule-113849009cdc08b118e4da8e5df87b55387b791cbe00a9c1adc75c418cf0f62ab3d33796e3eeb201be7097f536506874c9365945954175eaea23fbf50d18ef0a"' : 'data-bs-target="#xs-components-links-module-IconsModule-113849009cdc08b118e4da8e5df87b55387b791cbe00a9c1adc75c418cf0f62ab3d33796e3eeb201be7097f536506874c9365945954175eaea23fbf50d18ef0a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-IconsModule-113849009cdc08b118e4da8e5df87b55387b791cbe00a9c1adc75c418cf0f62ab3d33796e3eeb201be7097f536506874c9365945954175eaea23fbf50d18ef0a"' :
                                            'id="xs-components-links-module-IconsModule-113849009cdc08b118e4da8e5df87b55387b791cbe00a9c1adc75c418cf0f62ab3d33796e3eeb201be7097f536506874c9365945954175eaea23fbf50d18ef0a"' }>
                                            <li class="link">
                                                <a href="components/IconComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IconComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/IndicatorsModule.html" data-type="entity-link" >IndicatorsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutsModule.html" data-type="entity-link" >LayoutsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MessageIndicatorModule.html" data-type="entity-link" >MessageIndicatorModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-MessageIndicatorModule-8f3670bc4a98f79f8eba943a83b78af157fae820320e1fab81594559b497f316a3abc8f57a506ec4a41c1d9521e29996ca61618c1c54aa9707712503b139c52e"' : 'data-bs-target="#xs-components-links-module-MessageIndicatorModule-8f3670bc4a98f79f8eba943a83b78af157fae820320e1fab81594559b497f316a3abc8f57a506ec4a41c1d9521e29996ca61618c1c54aa9707712503b139c52e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-MessageIndicatorModule-8f3670bc4a98f79f8eba943a83b78af157fae820320e1fab81594559b497f316a3abc8f57a506ec4a41c1d9521e29996ca61618c1c54aa9707712503b139c52e"' :
                                            'id="xs-components-links-module-MessageIndicatorModule-8f3670bc4a98f79f8eba943a83b78af157fae820320e1fab81594559b497f316a3abc8f57a506ec4a41c1d9521e29996ca61618c1c54aa9707712503b139c52e"' }>
                                            <li class="link">
                                                <a href="components/DangerMessageIndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DangerMessageIndicatorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InfoMessageIndicatorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InfoMessageIndicatorComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NavigationModule.html" data-type="entity-link" >NavigationModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' : 'data-bs-target="#xs-components-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' :
                                            'id="xs-components-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' }>
                                            <li class="link">
                                                <a href="components/AppNavButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationCategoryToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryToggleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialMediaButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextHyperlinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' : 'data-bs-target="#xs-directives-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' :
                                        'id="xs-directives-links-module-NavigationModule-625d58e0698f86b86d9e0ac50dc20e67e559eb2d10e05acd28b7fc4b0ab47bbcbed7aa8307d4f2e8a63e2fbeb87f43f6dd979cec91b89e9cdac57be5456e6acb"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonToggleSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxErrorVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CtaButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CtaButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonDescriptionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonDescriptionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonTaglineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonTaglineDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationIconDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationIconDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TextHyperlinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RichTooltipModule.html" data-type="entity-link" >RichTooltipModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' : 'data-bs-target="#xs-components-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' :
                                            'id="xs-components-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' }>
                                            <li class="link">
                                                <a href="components/RichTooltipActionsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipActionsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RichTooltipContainerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipContainerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RichTooltipContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RichTooltipTaglineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipTaglineComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' : 'data-bs-target="#xs-directives-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' :
                                        'id="xs-directives-links-module-RichTooltipModule-2eb936ee22034674b37e7eb8699ff60605758c52e5a73bc64519460ba7807121ea0869366f700bd75b9a5b400c22f20248d48aad834f7242c6936fe1d584eb98"' }>
                                        <li class="link">
                                            <a href="directives/RichTooltipCloseDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipCloseDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/RichTooltipDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RichTooltipDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ScrollingModule.html" data-type="entity-link" >ScrollingModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-ScrollingModule-f795b4e39860d3d3d1da4c5718bb47b0afa922bfcdcfe2e1e2e08df07cc80fa0eb57bac19179528189c4a193409c8d43afa820c116a442a15432f2914d5f62c3"' : 'data-bs-target="#xs-directives-links-module-ScrollingModule-f795b4e39860d3d3d1da4c5718bb47b0afa922bfcdcfe2e1e2e08df07cc80fa0eb57bac19179528189c4a193409c8d43afa820c116a442a15432f2914d5f62c3"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-ScrollingModule-f795b4e39860d3d3d1da4c5718bb47b0afa922bfcdcfe2e1e2e08df07cc80fa0eb57bac19179528189c4a193409c8d43afa820c116a442a15432f2914d5f62c3"' :
                                        'id="xs-directives-links-module-ScrollingModule-f795b4e39860d3d3d1da4c5718bb47b0afa922bfcdcfe2e1e2e08df07cc80fa0eb57bac19179528189c4a193409c8d43afa820c116a442a15432f2914d5f62c3"' }>
                                        <li class="link">
                                            <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScrollOverflowFadeDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SliderModule.html" data-type="entity-link" >SliderModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' : 'data-bs-target="#xs-components-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' :
                                            'id="xs-components-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' }>
                                            <li class="link">
                                                <a href="components/AppNavButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppNavButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HelpButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavigationCategoryToggleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationCategoryToggleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SocialMediaButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TextHyperlinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' : 'data-bs-target="#xs-directives-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' :
                                        'id="xs-directives-links-module-SliderModule-fac85f4660b1ac1d05da475f8c0b9f4bf35be7a798f71a926a272a9b1367147086f51ff1ccee75b4604f05ba4410946423678d447597935287b106a5f479d2a0"' }>
                                        <li class="link">
                                            <a href="directives/ButtonSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonToggleSizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonToggleSizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckboxErrorVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/CtaButtonDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CtaButtonDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonDescriptionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonDescriptionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationButtonTaglineDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationButtonTaglineDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/NavigationIconDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavigationIconDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PrimaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrimaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/SecondaryButtonVariantDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SecondaryButtonVariantDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/TextHyperlinkDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TextHyperlinkDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TableOfContentsLayoutModule.html" data-type="entity-link" >TableOfContentsLayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TableOfContentsLayoutModule-3dcaf41e075c1d2c533ddac1ecb74378d4895e21473033db5f1d0b7ebd98803aca7ab1f06d5c313ab68f07de1a9391c4da1ca5574e1c2892e719dc0166bc006f"' : 'data-bs-target="#xs-components-links-module-TableOfContentsLayoutModule-3dcaf41e075c1d2c533ddac1ecb74378d4895e21473033db5f1d0b7ebd98803aca7ab1f06d5c313ab68f07de1a9391c4da1ca5574e1c2892e719dc0166bc006f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TableOfContentsLayoutModule-3dcaf41e075c1d2c533ddac1ecb74378d4895e21473033db5f1d0b7ebd98803aca7ab1f06d5c313ab68f07de1a9391c4da1ca5574e1c2892e719dc0166bc006f"' :
                                            'id="xs-components-links-module-TableOfContentsLayoutModule-3dcaf41e075c1d2c533ddac1ecb74378d4895e21473033db5f1d0b7ebd98803aca7ab1f06d5c313ab68f07de1a9391c4da1ca5574e1c2892e719dc0166bc006f"' }>
                                            <li class="link">
                                                <a href="components/TableOfContentsLayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableOfContentsLayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableOfContentsLayoutHeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TableOfContentsLayoutHeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WorkflowCardModule.html" data-type="entity-link" >WorkflowCardModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-WorkflowCardModule-d538998a7e86168fd6122c6dcf572323089bd5f6cec04f45e8b7802e8f7593435755961eed72538b47172fbfbb503e8855584b766b860a65fe406d0bcec4e6a9"' : 'data-bs-target="#xs-components-links-module-WorkflowCardModule-d538998a7e86168fd6122c6dcf572323089bd5f6cec04f45e8b7802e8f7593435755961eed72538b47172fbfbb503e8855584b766b860a65fe406d0bcec4e6a9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WorkflowCardModule-d538998a7e86168fd6122c6dcf572323089bd5f6cec04f45e8b7802e8f7593435755961eed72538b47172fbfbb503e8855584b766b860a65fe406d0bcec4e6a9"' :
                                            'id="xs-components-links-module-WorkflowCardModule-d538998a7e86168fd6122c6dcf572323089bd5f6cec04f45e8b7802e8f7593435755961eed72538b47172fbfbb503e8855584b766b860a65fe406d0bcec4e6a9"' }>
                                            <li class="link">
                                                <a href="components/WorkflowCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkflowCardComponent</a>
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
                                <a href="components/ActionCardActionComponent.html" data-type="entity-link" >ActionCardActionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ActionCardComponent.html" data-type="entity-link" >ActionCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ApiCommandComponent.html" data-type="entity-link" >ApiCommandComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppLabelComponent.html" data-type="entity-link" >AppLabelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppNavButtonComponent.html" data-type="entity-link" >AppNavButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BackButtonBarComponent.html" data-type="entity-link" >BackButtonBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BottomSheetComponent.html" data-type="entity-link" >BottomSheetComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandLogoComponent.html" data-type="entity-link" >BrandLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BrandMarkComponent.html" data-type="entity-link" >BrandMarkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbsComponent.html" data-type="entity-link" >BreadcrumbsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ButtonComponent.html" data-type="entity-link" >ButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CardMenuComponent.html" data-type="entity-link" >CardMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CategoriesComponent.html" data-type="entity-link" >CategoriesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CodeBlockComponent.html" data-type="entity-link" >CodeBlockComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CodeBlockGlobalStylesComponent.html" data-type="entity-link" >CodeBlockGlobalStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ColorPickerComponent.html" data-type="entity-link" >ColorPickerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ConsentBannerComponent.html" data-type="entity-link" >ConsentBannerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentButtonComponent.html" data-type="entity-link" >ContentButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContentPageComponent.html" data-type="entity-link" >ContentPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CopyableUrlContainerComponent.html" data-type="entity-link" >CopyableUrlContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CountCardComponent.html" data-type="entity-link" >CountCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CtaBarComponent.html" data-type="entity-link" >CtaBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DangerMessageIndicatorComponent.html" data-type="entity-link" >DangerMessageIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DataViewerComponent.html" data-type="entity-link" >DataViewerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeleteFileButtonComponent.html" data-type="entity-link" >DeleteFileButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DeprecatedWorkflowCardComponent.html" data-type="entity-link" class="deprecated-name">DeprecatedWorkflowCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DesktopMenuComponent.html" data-type="entity-link" >DesktopMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorIndicatorComponent.html" data-type="entity-link" >ErrorIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelActionsComponent.html" data-type="entity-link" >ExpansionPanelActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelComponent.html" data-type="entity-link" >ExpansionPanelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ExpansionPanelHeaderContentComponent.html" data-type="entity-link" >ExpansionPanelHeaderContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FlatCardActionsComponent.html" data-type="entity-link" >FlatCardActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FlatCardComponent.html" data-type="entity-link" >FlatCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FlexContainerComponent.html" data-type="entity-link" >FlexContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenActionsComponent.html" data-type="entity-link" >FullscreenActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenPortalComponent.html" data-type="entity-link" >FullscreenPortalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FullscreenPortalContentComponent.html" data-type="entity-link" >FullscreenPortalContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FundingComponent.html" data-type="entity-link" >FundingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GalleryCardComponent.html" data-type="entity-link" >GalleryCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/GridContainerComponent.html" data-type="entity-link" >GridContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HelpButtonComponent.html" data-type="entity-link" >HelpButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HraYoutubePlayerComponent.html" data-type="entity-link" >HraYoutubePlayerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HubmapMenuContentComponent.html" data-type="entity-link" >HubmapMenuContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/IconComponent.html" data-type="entity-link" >IconComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ImageComponent.html" data-type="entity-link" >ImageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoButtonComponent.html" data-type="entity-link" >InfoButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoButtonTooltipContentComponent.html" data-type="entity-link" >InfoButtonTooltipContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoButtonTooltipTaglineComponent.html" data-type="entity-link" >InfoButtonTooltipTaglineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoMessageIndicatorComponent.html" data-type="entity-link" >InfoMessageIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InfoModalComponent.html" data-type="entity-link" >InfoModalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MarkdownComponent.html" data-type="entity-link" >MarkdownComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuContentComponent.html" data-type="entity-link" >MenuContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuDemoComponent.html" data-type="entity-link" >MenuDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MobileMenuComponent.html" data-type="entity-link" >MobileMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavHeaderButtonsComponent.html" data-type="entity-link" >NavHeaderButtonsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationButtonComponent.html" data-type="entity-link" >NavigationButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationCategoryComponent.html" data-type="entity-link" >NavigationCategoryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationCategoryToggleComponent.html" data-type="entity-link" >NavigationCategoryToggleComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NavigationItemComponent.html" data-type="entity-link" >NavigationItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoResultsIndicatorComponent.html" data-type="entity-link" >NoResultsIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" >NotFoundPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NoticeComponent.html" data-type="entity-link" >NoticeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageLabelComponent.html" data-type="entity-link" >PageLabelComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PageSectionComponent.html" data-type="entity-link" >PageSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlainTooltipStylesComponent.html" data-type="entity-link" >PlainTooltipStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PrivacyPreferencesComponent.html" data-type="entity-link" >PrivacyPreferencesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProfileCardComponent.html" data-type="entity-link" >ProfileCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProgressSpinnerComponent.html" data-type="entity-link" >ProgressSpinnerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResultsIndicatorComponent.html" data-type="entity-link" >ResultsIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RichTooltipActionsComponent.html" data-type="entity-link" >RichTooltipActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RichTooltipContainerComponent.html" data-type="entity-link" >RichTooltipContainerComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RichTooltipContentComponent.html" data-type="entity-link" >RichTooltipContentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RichTooltipTaglineComponent.html" data-type="entity-link" >RichTooltipTaglineComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollbarStylesComponent.html" data-type="entity-link" >ScrollbarStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ScrollOverflowFadeStylesComponent.html" data-type="entity-link" >ScrollOverflowFadeStylesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SectionLinkComponent.html" data-type="entity-link" >SectionLinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ServerErrorPageComponent.html" data-type="entity-link" >ServerErrorPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SiteNavigationComponent.html" data-type="entity-link" >SiteNavigationComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SnackbarComponent.html" data-type="entity-link" >SnackbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SocialMediaButtonComponent.html" data-type="entity-link" >SocialMediaButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/SoftwareStatusIndicatorComponent.html" data-type="entity-link" >SoftwareStatusIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/StepIndicatorComponent.html" data-type="entity-link" >StepIndicatorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableComponent.html" data-type="entity-link" >TableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableOfContentsComponent.html" data-type="entity-link" >TableOfContentsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableOfContentsDemoComponent.html" data-type="entity-link" >TableOfContentsDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableOfContentsLayoutComponent.html" data-type="entity-link" >TableOfContentsLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableOfContentsLayoutDemoComponent.html" data-type="entity-link" >TableOfContentsLayoutDemoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TableOfContentsLayoutHeaderComponent.html" data-type="entity-link" >TableOfContentsLayoutHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextHyperlinkComponent.html" data-type="entity-link" >TextHyperlinkComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TextHyperlinkGlobalStylesComponent.html" data-type="entity-link" >TextHyperlinkGlobalStylesComponent</a>
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
                            <li class="link">
                                <a href="components/UiSectionComponent.html" data-type="entity-link" >UiSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VersionedDataTableComponent.html" data-type="entity-link" >VersionedDataTableComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewerCardComponent.html" data-type="entity-link" >ViewerCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ViewerMenuComponent.html" data-type="entity-link" >ViewerMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VisualButtonComponent.html" data-type="entity-link" >VisualButtonComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardActionsComponent.html" data-type="entity-link" >WorkflowCardActionsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardComponent.html" data-type="entity-link" >WorkflowCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/WorkflowCardExtraComponent.html" data-type="entity-link" >WorkflowCardExtraComponent</a>
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
                                    <a href="directives/BaseButtonVariantDirective.html" data-type="entity-link" >BaseButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ButtonSizeDirective.html" data-type="entity-link" >ButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ButtonToggleSizeDirective.html" data-type="entity-link" >ButtonToggleSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ButtonVariantDirective.html" data-type="entity-link" >ButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CheckboxErrorVariantDirective.html" data-type="entity-link" >CheckboxErrorVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/CtaButtonDirective.html" data-type="entity-link" >CtaButtonDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/DensityDirective.html" data-type="entity-link" >DensityDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/FullscreenDirective.html" data-type="entity-link" >FullscreenDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HubmapMenuGroupDirective.html" data-type="entity-link" >HubmapMenuGroupDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/HubmapMenuItemDirective.html" data-type="entity-link" >HubmapMenuItemDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconButtonSizeDirective.html" data-type="entity-link" >IconButtonSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconButtonVariantDirective.html" data-type="entity-link" >IconButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/IconRowElementDirective.html" data-type="entity-link" >IconRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/LinkRowElementDirective.html" data-type="entity-link" >LinkRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MarkdownRowElementDirective.html" data-type="entity-link" >MarkdownRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MenuButtonRowElementDirective.html" data-type="entity-link" >MenuButtonRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MenuGroupDirective.html" data-type="entity-link" >MenuGroupDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MenuItemDirective.html" data-type="entity-link" >MenuItemDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/MenuSubGroupDirective.html" data-type="entity-link" >MenuSubGroupDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NavigationButtonDescriptionDirective.html" data-type="entity-link" >NavigationButtonDescriptionDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NavigationButtonTaglineDirective.html" data-type="entity-link" >NavigationButtonTaglineDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NavigationIconDirective.html" data-type="entity-link" >NavigationIconDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/NumericRowElementDirective.html" data-type="entity-link" >NumericRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/PlainTooltipDirective.html" data-type="entity-link" >PlainTooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/PrimaryButtonVariantDirective.html" data-type="entity-link" >PrimaryButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ProgressBarColorDirective.html" data-type="entity-link" >ProgressBarColorDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/RichTooltipCloseDirective.html" data-type="entity-link" >RichTooltipCloseDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/RichTooltipContextDirective.html" data-type="entity-link" >RichTooltipContextDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/RichTooltipDirective.html" data-type="entity-link" >RichTooltipDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ScrollOverflowFadeDirective.html" data-type="entity-link" >ScrollOverflowFadeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SecondaryButtonVariantDirective.html" data-type="entity-link" >SecondaryButtonVariantDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/SoftwareStatusSizeDirective.html" data-type="entity-link" >SoftwareStatusSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TextHyperlinkDirective.html" data-type="entity-link" >TextHyperlinkDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TextRowElementDirective.html" data-type="entity-link" >TextRowElementDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/TreeSizeDirective.html" data-type="entity-link" >TreeSizeDirective</a>
                                </li>
                                <li class="link">
                                    <a href="directives/ViewOutletDirective.html" data-type="entity-link" >ViewOutletDirective</a>
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
                                    <a href="injectables/BottomSheetService.html" data-type="entity-link" >BottomSheetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogService.html" data-type="entity-link" >DialogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IconConfigRegistryService.html" data-type="entity-link" >IconConfigRegistryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageSectionActivationService.html" data-type="entity-link" >PageSectionActivationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PageSectionService.html" data-type="entity-link" >PageSectionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrivacyPreferencesService.html" data-type="entity-link" >PrivacyPreferencesService</a>
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
                                <a href="interfaces/BreadcrumbItem.html" data-type="entity-link" >BreadcrumbItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryDef.html" data-type="entity-link" >CategoryDef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CtaConfig.html" data-type="entity-link" >CtaConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DataItem.html" data-type="entity-link" >DataItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DesignSystemOptions.html" data-type="entity-link" >DesignSystemOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DialogData.html" data-type="entity-link" >DialogData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconConfig.html" data-type="entity-link" >IconConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IconFeature.html" data-type="entity-link" >IconFeature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuDemoOption.html" data-type="entity-link" >MenuDemoOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MultiplePageSectionsBottomSheetData.html" data-type="entity-link" >MultiplePageSectionsBottomSheetData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NestedNode.html" data-type="entity-link" >NestedNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObservedElementsDiff.html" data-type="entity-link" >ObservedElementsDiff</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageSectionActivationOptions.html" data-type="entity-link" >PageSectionActivationOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageSectionData.html" data-type="entity-link" >PageSectionData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PageSectionInstance.html" data-type="entity-link" >PageSectionInstance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PrivacyPreferencesData.html" data-type="entity-link" >PrivacyPreferencesData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RichTooltipController.html" data-type="entity-link" >RichTooltipController</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollingGlobals.html" data-type="entity-link" >ScrollingGlobals</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScrollingOptions.html" data-type="entity-link" >ScrollingOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SinglePageSectionBottomSheetData.html" data-type="entity-link" >SinglePageSectionBottomSheetData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SnackbarData.html" data-type="entity-link" >SnackbarData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TableBottomSheetData.html" data-type="entity-link" >TableBottomSheetData</a>
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